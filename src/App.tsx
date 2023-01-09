import { useEffect, useState } from "react";
import "./App.scss";
import { FormControl } from "./core/form";
import { Components } from "./shared/components";
import {
  CheckboxModel,
  HobiModel,
  JenisKelaminModel,
  StatusPerkawinanModel,
} from "./shared/model";
import { Validators } from "./shared/validators";

function App() {
  const [state, setState] = useState({
    statusPerkawinanList: StatusPerkawinanModel.createList(),
    jenisKelaminList: JenisKelaminModel.createList(),
    hobiList: CheckboxModel.createList(HobiModel.createList()),
  });

  const [record, setRecord] = useState<{ [key: string]: any }>({
    name: new FormControl([
      "",
      [
        Validators.required("Nama wajib diisi"),
        Validators.minLength(4, "Nama tidak boleh kurang dari 4 karakter"),
      ],
    ]),
    dob: new FormControl([
      "",
      Validators.required("Tanggal lahir wajib dipilih"),
    ]),
    age: new FormControl(["", Validators.required("Usia wajib diisi")]),
    address: new FormControl(["", Validators.required("Alamat wajib diisi")]),
    maritalStatus: new FormControl([
      "",
      Validators.required("Statis perkawinan wajib dipilih"),
    ]),
    gender: new FormControl([
      "",
      Validators.required("Jenis kelamin wajib dipilih"),
    ]),
    termAndCondition: new FormControl([
      false,
      Validators.required("Syarat dan ketentuan wajib disetujui"),
    ]),
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
      const hobiList = state.hobiList.map((item) => {
        item.isChecked = hobi.findIndex((h) => h.id === item.option.id) !== -1;
        return item;
      });
      setState((state) => ({
        ...state,
        hobiList,
      }));
      // setRecord(record);
    }, 5000);
  }, []);

  const handleOnChange = (e: any) => {
    const control: FormControl = record[e.target.name];
    control.patchValue(e.target.value);
    setRecord((record) => ({
      ...record,
      [e.target.name]: control,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const value: { [key: string]: any } = {};
    Object.keys(record).forEach((key) => {
      value[key] = record[key].value;
    });

    console.log(value);
    const { maritalStatus, gender, ...dto } = value;
    dto.maritalStatus = StatusPerkawinanModel.getById(+maritalStatus);
    dto.gender = JenisKelaminModel.getById(+gender);
    dto.hobies = CheckboxModel.getValues(state.hobiList);

    console.log(dto);
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
                (record.name.getIsValid() ? "is-valid" : "is-invalid")
              }
              name="name"
              placeholder="Masukkan nama Anda"
              onChange={handleOnChange}
              {...record.name}
            />
            {record.name.errors && (
              <small className="text-danger">
                {record.name.errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Tanggal Lahir" required={true}>
            <input
              type="date"
              className={
                "form-control " +
                (record.dob.getIsValid() ? "is-valid" : "is-invalid")
              }
              name="dob"
              placeholder="Pilih tanggal lahir Anda"
              onChange={handleOnChange}
              {...record.dob}
            />
            {record.dob.errors && (
              <small className="text-danger">{record.dob.errors.message}</small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Usia" required={true}>
            <input
              type="number"
              className={
                "form-control " +
                (record.age.getIsValid() ? "is-valid" : "is-invalid")
              }
              name="age"
              placeholder="Masukkan usia Anda"
              onChange={handleOnChange}
              {...record.age}
            />
            {record.age.errors && (
              <small className="text-danger">{record.age.errors.message}</small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Alamat" required={true}>
            <textarea
              className={
                "form-control " +
                (record.address.getIsValid() ? "is-valid" : "is-invalid")
              }
              name="address"
              placeholder="Masukkan alamat Anda"
              value={record.address}
              onChange={handleOnChange}
              {...record.address}
            />
            {record.address.errors && (
              <small className="text-danger">
                {record.address.errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Status Perkawinan" required={true}>
            <select
              className={
                "form-select " +
                (record.maritalStatus.getIsValid() ? "is-valid" : "is-invalid")
              }
              name="maritalStatus"
              onChange={handleOnChange}
              {...record.maritalStatus}
            >
              <option value="">Pilih status perkawinan</option>
              {state.statusPerkawinanList.map((statusPerkawinan) => (
                <option value={statusPerkawinan.id} key={statusPerkawinan.id}>
                  {statusPerkawinan.name}
                </option>
              ))}
            </select>
            {record.maritalStatus.errors && (
              <small className="text-danger">
                {record.maritalStatus.errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Jenis Kelamin" required={true}>
            {state.jenisKelaminList.map((jenisKelamin) => (
              <div className="form-check" key={jenisKelamin.id}>
                <input
                  className={
                    "form-check-input " +
                    (record.gender.getIsValid() ? "is-valid" : "is-invalid")
                  }
                  type="radio"
                  name="gender"
                  id={"jenisKelamin" + jenisKelamin.id}
                  value={jenisKelamin.id}
                  checked={jenisKelamin.id === +record.gender.value}
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
            {record.gender.errors && (
              <small className="text-danger">
                {record.gender.errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Hobi" required={true}>
            {state.hobiList.map((hobi, i) => (
              <div className="form-check" key={hobi.option.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={"hobi" + hobi.option.id}
                  value={hobi.option.id}
                  checked={hobi.isChecked}
                  onChange={(e) => {
                    const hobiList = state.hobiList;
                    hobiList[i].isChecked = e.target.checked;
                    setState((state) => ({
                      ...state,
                      hobiList,
                    }));
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={"hobi" + hobi.option.id}
                >
                  {hobi.option.name}
                </label>
              </div>
            ))}
          </Components.Form.Group>

          <Components.Form.Group>
            <div className="form-check">
              <input
                className={
                  "form-check-input " +
                  (record.termAndCondition.getIsValid()
                    ? "is-valid"
                    : "is-invalid")
                }
                type="checkbox"
                id="termAndCondition"
                name="termAndCondition"
                checked={!!record.termAndCondition.value}
                onChange={(e) => {
                  const control = record.termAndCondition;
                  control.patchValue(e.target.checked);
                  setRecord((record) => ({
                    ...record,
                    termAndCondition: control,
                  }));
                }}
              />
              <label className="form-check-label" htmlFor="termAndCondition">
                Term and condition
              </label>
            </div>
            {record.termAndCondition.errors && (
              <small className="text-danger">
                {record.termAndCondition.errors.message}
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
