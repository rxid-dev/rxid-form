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
  const [state] = useState({
    statusPerkawinanList: StatusPerkawinanModel.createList(),
    jenisKelaminList: JenisKelaminModel.createList(),
    hobiList: HobiModel.createList(),
  });

  const form = useForm({
    code: [
      "",
      [
        Validators.required("Code wajib diisi"),
        Validators.regex("^[A-Z]*$", "Format code tidak valid"),
      ],
    ],
    name: [
      "",
      [
        Validators.required("Nama wajib diisi"),
        Validators.minLength(4, "Nama tidak boleh kurang dari 4 karakter"),
        Validators.maxLength(10, "Nama tidak boleh lebih dari 7 karakter"),
      ],
    ],
    nik: [
      "",
      [
        Validators.required("NIK wajib diisi"),
        Validators.number("NIK harus terdiri dari angka"),
        Validators.actualLength(16, "NIK harus tediri dari 16 angka"),
      ],
    ],
    email: [
      "",
      [Validators.required("Alamat email wajib diisi"), Validators.email()],
    ],
    dob: ["", Validators.required("Tanggal lahir wajib dipilih")],
    age: [
      "",
      [
        Validators.required("Usia wajib diisi"),
        Validators.number("Usia harus terdiri dari angka"),
        Validators.min(17, "Anda harus berusia diatas 16 tahun"),
        Validators.max(30, "Anda harus berusia kurang dari 31 tahun"),
      ],
    ],
    address: ["", Validators.required("Alamat wajib diisi")],
    maritalStatus: [
      "",
      Validators.required("Statis perkawinan wajib dipilih"),
      {
        toDTO: (value: StatusPerkawinanModel) => {
          return {
            marital_status_id: value.id,
          };
        },
      },
    ],
    gender: [
      "",
      Validators.required("Jenis kelamin wajib dipilih"),
      {
        toModel: (value) => {
          return {
            id: value.gender_id,
            name: value.gender_name,
          };
        },
        toDTO: (value: JenisKelaminModel) => {
          return {
            gender_id: value.id,
          };
        },
      },
    ],
    hobi: [
      "",
      Validators.required("Hobi wajib dipilih"),
      {
        toDTO: (values: Array<HobiModel>) => {
          return {
            hobbie_ids: values.map((val) => val.id),
          };
        },
      },
    ],
    termAndCondition: [
      false,
      Validators.required("Syarat dan ketentuan wajib disetujui"),
    ],
  });

  useEffect(() => {
    setTimeout(() => {
      const gender = JenisKelaminModel.createList()[0];
      const record = {
        code: "XYZ",
        name: "John Doe",
        nik: "1234567890123456",
        email: "johndoe@gmaol.com",
        dob: "1990-03-31",
        age: "24",
        address: "Jln. Cendrawasi No.88",
        maritalStatus: StatusPerkawinanModel.createList()[3],
        no_akta_menikah: "00-77-88",
        no_akta_meninggal: "00-77-88",
        gender: {
          gender_id: gender.id,
          gender_name: gender.name,
        },
        termAndCondition: true,
        hobi: HobiModel.createList().slice(0, 2),
      };
      onChangeMaritalStatus(record.maritalStatus);
      form.patchValue(record);
    }, 2000);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validate();
    if (form.getIsValid()) {
      console.log(form.getValue());
    }
  };

  const onChangeMaritalStatus = (value: StatusPerkawinanModel) => {
    if (value.id === 1) {
      form.removeControl("no_akta_meninggal");
      form.addControl("no_akta_menikah", [
        "",
        Validators.required("Nomor akta menikah wajib diisi"),
      ]);
    } else if (value.id === 4) {
      form.removeControl("no_akta_menikah");
      form.addControl("no_akta_meninggal", [
        "",
        Validators.required("Nomor akta meninggal wajib diisi"),
      ]);
    } else {
      form.removeControl("no_akta_menikah");
      form.removeControl("no_akta_meninggal");
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
          <Components.Form.Group label="Code" required={true}>
            <input
              type="text"
              className={
                "form-control " +
                (form.get("code").touched
                  ? form.get("code").isValid
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              placeholder="Masukkan code Anda"
              {...form.get("code").nativeProps}
            />
            {form.get("code").touched && form.get("code").errors && (
              <small className="text-danger">
                {form.get("code").errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Nama" required={true}>
            <input
              type="text"
              className={
                "form-control " +
                (form.get("name").touched
                  ? form.get("name").isValid
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              placeholder="Masukkan nama Anda"
              {...form.get("name").nativeProps}
            />
            {form.get("name").touched && form.get("name").errors && (
              <small className="text-danger">
                {form.get("name").errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="NIK" required={true}>
            <input
              type="text"
              className={
                "form-control " +
                (form.get("nik").touched
                  ? form.get("nik").isValid
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              placeholder="Masukkan NIK Anda"
              {...form.get("nik").nativeProps}
            />
            {form.get("nik").touched && form.get("nik").errors && (
              <small className="text-danger">
                {form.get("nik").errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Email" required={true}>
            <input
              type="text"
              className={
                "form-control " +
                (form.get("email").touched
                  ? form.get("email").isValid
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              placeholder="Masukkan email Anda"
              {...form.get("email").nativeProps}
            />
            {form.get("email").touched && form.get("email").errors && (
              <small className="text-danger">
                {form.get("email").errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Tanggal Lahir" required={true}>
            <input
              type="date"
              className={
                "form-control " +
                (form.get("dob").touched
                  ? form.get("dob").isValid
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              placeholder="Pilih tanggal lahir Anda"
              {...form.get("dob").nativeProps}
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
                  ? form.get("age").isValid
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              placeholder="Masukkan usia Anda"
              {...form.get("age").nativeProps}
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
                  ? form.get("address").isValid
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              placeholder="Masukkan alamat Anda"
              {...form.get("address").nativeProps}
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
                  ? form.get("maritalStatus").isValid
                    ? "is-valid"
                    : "is-invalid"
                  : "")
              }
              {...form.get("maritalStatus").nativeProps}
              onChange={(e) => {
                let value: any = e.target.value;
                if (value) {
                  const indexOfOption = state.statusPerkawinanList.findIndex(
                    (statusPerkawinan) =>
                      statusPerkawinan.id === +e.target.value
                  );
                  value = state.statusPerkawinanList[indexOfOption];
                }
                form.get("maritalStatus").setValue(value);
                onChangeMaritalStatus(value);
              }}
              value={form.get("maritalStatus").value?.id}
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

          {form.get("no_akta_menikah") && (
            <Components.Form.Group label="Nomor Akta Menikah" required={true}>
              <input
                type="text"
                className={
                  "form-control " +
                  (form.get("no_akta_menikah").touched
                    ? form.get("no_akta_menikah").isValid
                      ? "is-valid"
                      : "is-invalid"
                    : "")
                }
                placeholder="Masukkan nomor akta menikah"
                {...form.get("no_akta_menikah").nativeProps}
              />
              {form.get("no_akta_menikah").touched &&
                form.get("no_akta_menikah").errors && (
                  <small className="text-danger">
                    {form.get("no_akta_menikah").errors.message}
                  </small>
                )}
            </Components.Form.Group>
          )}

          {form.get("no_akta_meninggal") && (
            <Components.Form.Group label="Nomor Akta Meninggal" required={true}>
              <input
                type="text"
                className={
                  "form-control " +
                  (form.get("no_akta_meninggal").touched
                    ? form.get("no_akta_meninggal").isValid
                      ? "is-valid"
                      : "is-invalid"
                    : "")
                }
                placeholder="Masukkan nomor akta meninggal"
                {...form.get("no_akta_meninggal").nativeProps}
              />
              {form.get("no_akta_meninggal").touched &&
                form.get("no_akta_meninggal").errors && (
                  <small className="text-danger">
                    {form.get("no_akta_meninggal").errors.message}
                  </small>
                )}
            </Components.Form.Group>
          )}

          <Components.Form.Group label="Jenis Kelamin" required={true}>
            {state.jenisKelaminList.map((jenisKelamin) => (
              <div className="form-check" key={jenisKelamin.id}>
                <input
                  className={
                    "form-check-input " +
                    (form.get("gender").touched
                      ? form.get("gender").isValid
                        ? "is-valid"
                        : "is-invalid"
                      : "")
                  }
                  type="radio"
                  id={"jenisKelamin" + jenisKelamin.id}
                  {...form.get("gender").nativeProps}
                  value={jenisKelamin.id}
                  checked={jenisKelamin.id === +form.get("gender").value?.id}
                  onChange={() => {
                    form.get("gender").setValue(jenisKelamin);
                  }}
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
            {state.hobiList.map((hobi) => (
              <div className="form-check" key={hobi.id}>
                <input
                  className={
                    "form-check-input " +
                    (form.get("hobi").touched
                      ? form.get("hobi").isValid
                        ? "is-valid"
                        : "is-invalid"
                      : "")
                  }
                  type="checkbox"
                  id={"hobi" + hobi.id}
                  {...form.get("code").nativeProps}
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
                    control.setValue(value.length > 0 ? value : "");
                    control.markAsTouched();
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
                    ? form.get("termAndCondition").isValid
                      ? "is-valid"
                      : "is-invalid"
                    : "")
                }
                type="checkbox"
                id="termAndCondition"
                {...form.get("code").nativeProps}
                checked={!!form.get("termAndCondition").value}
                onChange={(e) => {
                  const control: FormControl = form.get("termAndCondition");
                  control.setValue(e.target.checked);
                  control.markAsTouched();
                }}
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
