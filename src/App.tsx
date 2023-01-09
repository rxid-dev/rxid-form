import { useEffect, useState } from "react";
import "./App.scss";
import { FormControl } from "./core/form";
import { useForm } from "./core/form/useForm";
import { Components } from "./shared/components";
import {
  HobiModel,
  JenisKelaminModel,
  StatusPerkawinanModel,
} from "./shared/model";
import { Validators } from "./shared/validators";

function App() {
  const [state, setState] = useState({
    statusPerkawinanList: StatusPerkawinanModel.createList(),
    jenisKelaminList: JenisKelaminModel.createList(),
    hobiList: HobiModel.createList(),
  });

  const form = useForm({
    name: [
      "",
      [
        Validators.required("Nama wajib diisi"),
        Validators.minLength(4, "Nama tidak boleh kurang dari 4 karakter"),
      ],
    ],
    dob: ["", Validators.required("Tanggal lahir wajib dipilih")],
    age: ["", Validators.required("Usia wajib diisi")],
    address: ["", Validators.required("Alamat wajib diisi")],
    maritalStatus: ["", Validators.required("Statis perkawinan wajib dipilih")],
    gender: ["", Validators.required("Jenis kelamin wajib dipilih")],
    hobi: ["", Validators.required("Hobi wajib dipilih")],
    termAndCondition: [
      false,
      Validators.required("Syarat dan ketentuan wajib disetujui"),
    ],
  });

  useEffect(() => {
    setTimeout(() => {
      const { hobi, ...record } = {
        name: "John Doe",
        dob: "1990-03-31",
        age: "24",
        address: "Jln. Cendrawasi No.88",
        maritalStatus: 3,
        gender: 2,
        termAndCondition: true,
        hobi: HobiModel.createList().slice(0, 2),
      };
      setState((state) => ({
        ...state,
      }));
    }, 5000);
  }, []);

  const handleOnChange = (e: any) => {
    form.patchValue({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validate();
    if (form.getIsValid()) {
      console.log(form.getValue());
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-0">React Form</h1>
      <p>Learn how to use form in react</p>
      {Array(0)
        .fill(0)
        .map((val, index) => {
          return <Components.CustomComponent key={val + index + 1} />;
        })}
      <Components.Card header="User Form">
        <form onSubmit={handleSubmit}>
          <Components.Form.Group label="Nama" required={true}>
            <input
              type="text"
              className={
                "form-control " +
                (form.get("name").touched
                  ? form.get("name").getIsValid()
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              name="name"
              placeholder="Masukkan nama Anda"
              onChange={handleOnChange}
              value={form.get("name").value}
            />
            {form.get("name").touched && form.get("name").errors && (
              <small className="text-danger">
                {form.get("name").errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Tanggal Lahir" required={true}>
            <input
              type="date"
              className={
                "form-control " +
                (form.get("dob").touched
                  ? form.get("dob").getIsValid()
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              name="dob"
              placeholder="Pilih tanggal lahir Anda"
              onChange={handleOnChange}
              value={form.get("dob").value}
            />
            {form.get("dob").touched && form.get("dob").errors && (
              <small className="text-danger">
                {form.get("dob").errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Usia" required={true}>
            <input
              type="number"
              className={
                "form-control " +
                (form.get("age").touched
                  ? form.get("age").getIsValid()
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              name="age"
              placeholder="Masukkan usia Anda"
              onChange={handleOnChange}
              value={form.get("age").value}
            />
            {form.get("age").touched && form.get("age").errors && (
              <small className="text-danger">
                {form.get("age").errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Alamat" required={true}>
            <textarea
              className={
                "form-control " +
                (form.get("address").touched
                  ? form.get("address").getIsValid()
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              name="address"
              placeholder="Masukkan alamat Anda"
              value={form.get("address").value}
              onChange={handleOnChange}
            />
            {form.get("address").touched && form.get("address").errors && (
              <small className="text-danger">
                {form.get("address").errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Status Perkawinan" required={true}>
            <select
              className={
                "form-select " +
                (form.get("maritalStatus").touched
                  ? form.get("maritalStatus").getIsValid()
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              name="maritalStatus"
              onChange={handleOnChange}
              value={form.get("maritalStatus").value}
            >
              <option value="">Pilih status perkawinan</option>
              {state.statusPerkawinanList.map((statusPerkawinan) => (
                <option value={statusPerkawinan.id} key={statusPerkawinan.id}>
                  {statusPerkawinan.name}
                </option>
              ))}
            </select>
            {form.get("maritalStatus").touched &&
              form.get("maritalStatus").errors && (
                <small className="text-danger">
                  {form.get("maritalStatus").errors.message}
                </small>
              )}
          </Components.Form.Group>

          <Components.Form.Group label="Jenis Kelamin" required={true}>
            {state.jenisKelaminList.map((jenisKelamin) => (
              <div className="form-check" key={jenisKelamin.id}>
                <input
                  className={
                    "form-check-input " +
                    (form.get("gender").touched
                      ? form.get("gender").getIsValid()
                        ? "is-valid"
                        : "is-invalid"
                      : "")
                  }
                  type="radio"
                  name="gender"
                  id={"jenisKelamin" + jenisKelamin.id}
                  value={jenisKelamin.id}
                  checked={jenisKelamin.id === +form.get("gender").value}
                  onChange={handleOnChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={"jenisKelamin" + jenisKelamin.id}
                >
                  {jenisKelamin.name}
                </label>
              </div>
            ))}
            {form.get("gender").touched && form.get("gender").errors && (
              <small className="text-danger">
                {form.get("gender").errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Hobi" required={true}>
            {state.hobiList.map((hobi, i) => (
              <div className="form-check" key={hobi.id}>
                <input
                  className={
                    "form-check-input " +
                    (form.get("hobi").touched
                      ? form.get("hobi").getIsValid()
                        ? "is-valid"
                        : "is-invalid"
                      : "")
                  }
                  type="checkbox"
                  id={"hobi" + hobi.id}
                  value={hobi.id}
                  checked={
                    (form.get("hobi").value || []).findIndex(
                      (val: HobiModel) => val.id === hobi.id
                    ) !== -1
                  }
                  onChange={(e) => {
                    const control: FormControl = form.get("hobi");
                    const value = control.value || [];
                    if (e.target.checked) {
                      value.push(hobi);
                    } else {
                      const indexOfHobi = value.findIndex(
                        (val: HobiModel) => val.id === hobi.id
                      );
                      if (indexOfHobi !== -1) {
                        value.splice(indexOfHobi, 1);
                      }
                    }
                    form.patchValue({ hobi: value.length > 0 ? value : "" });
                  }}
                />
                <label className="form-check-label" htmlFor={"hobi" + hobi.id}>
                  {hobi.name}
                </label>
              </div>
            ))}
            {form.get("hobi").touched && form.get("hobi").errors && (
              <small className="text-danger">
                {form.get("hobi").errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group>
            <div className="form-check">
              <input
                className={
                  "form-check-input " +
                  (form.get("termAndCondition").touched
                    ? form.get("termAndCondition").getIsValid()
                      ? "is-valid"
                      : "is-invalid"
                    : "")
                }
                type="checkbox"
                id="termAndCondition"
                name="termAndCondition"
                checked={!!form.get("termAndCondition").value}
                onChange={(e) =>
                  form.patchValue({ termAndCondition: e.target.checked })
                }
              />
              <label className="form-check-label" htmlFor="termAndCondition">
                Term and condition
              </label>
            </div>
            {form.get("termAndCondition").touched &&
              form.get("termAndCondition").errors && (
                <small className="text-danger">
                  {form.get("termAndCondition").errors.message}
                </small>
              )}
          </Components.Form.Group>

          <button className="btn btn-primary">
            <em className="fas fa-plus"></em> Add
          </button>
        </form>
      </Components.Card>
    </div>
  );
}

export default App;
