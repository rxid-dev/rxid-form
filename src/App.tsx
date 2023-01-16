import { useEffect, useState } from "react";
import "./App.scss";
import { FormControl } from "./core/form";
import { FormArray } from "./core/form/FormArray";
import { formBuilder } from "./core/form/formBuilder";
import { FormGroup } from "./core/form/FormGroup";
import { useControl } from "./core/form/useControl";
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
    validatorsList: [
      {
        id: 1,
        name: "NONE",
      },
      {
        id: 2,
        name: "REQUIRED",
      },
      {
        id: 3,
        name: "NUMBER",
      },
    ],
  });

  const form = useForm({
    // start example
    validators: [""],
    validatorsInput: [""],
    alphaNumeric: ["123xYZ"],
    currency: ["123456789"],
    tel: ["0123456789"],
    // end example
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
    // address: ["", Validators.required("Alamat wajib diisi")],
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
    address: formBuilder.array(),
  });

  const control = useControl("npwp", [
    "",
    [
      Validators.required("NPWP wajib diisi"),
      Validators.number("NPWP harus tediri dari angka"),
      Validators.actualLength(15, "NPWP harus tediri dari 15 digit"),
    ],
  ]);

  useEffect(() => {
    form.setReadOnly();
    control.setReadOnly();
    setTimeout(() => {
      const gender = JenisKelaminModel.createList()[0];
      const record = {
        code: "XYZ",
        name: "John Doe",
        nik: "1234567890123456",
        npwp: "123456789012345",
        email: "johndoe@gmaol.com",
        dob: "1990-03-31",
        age: "24",
        address: [
          {
            street: "Address 1",
            village: "Village",
            subDistrict: "Sub district",
            district: "District",
            province: "Province",
            country: "ID",
            zipCode: "12345",
          },
          {
            street: "Address 2",
            village: "Village 2",
            subDistrict: "Sub district 2",
            district: "District 2",
            province: "Province 2",
            country: "ID 2",
            zipCode: "12345",
          },
          {
            street: "Address 3",
            village: "Village 3",
            subDistrict: "Sub district 3",
            district: "District 3",
            province: "Province 3",
            country: "ID 3",
            zipCode: "12345",
          },
        ],
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
      if (form.get("address").controls.length === 0) {
        record.address.forEach(() => addAddressFormArray());
      }
      form.patchValue(record);
      control.patchValue(record.npwp);
    }, 2000);
  }, []);

  const addAddressFormArray = () => {
    const control: FormArray = form.get("address") as FormArray;
    control.push(
      formBuilder.group({
        street: ["", Validators.required("Nama jalan wajib diisi")],
        village: ["", Validators.required("Desa wajib diisi")],
        subDistrict: ["", Validators.required("Kecamatan wajib diisi")],
        district: ["", Validators.required("Kabupaten wajib diisi")],
        province: ["", Validators.required("Provinsi wajib diisi")],
        country: ["", Validators.required("Negara wajib diisi")],
        zipCode: [
          "",
          [
            Validators.required("Kode pos wajib diisi"),
            Validators.number("Kodepos harus terdiri dari angka"),
            Validators.actualLength(5, "Kode pos harus terdiri dari 5 digit"),
          ],
        ],
      })
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.validate();
    if (form.isValid) {
      console.log(form.value);
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

  const handleChangeValidators = (value: any) => {
    if (value.id === 1) {
      // clear all validators
      form.get("validatorsInput").clearValidators();
    } else if (value.id === 2) {
      // add required validators and cut number validators
      form
        .get("validatorsInput")
        .setValidators(Validators.required("Validator input wajib diisi"));
    } else if (value.id === 3) {
      // add number validators and cut required validators
      form
        .get("validatorsInput")
        .setValidators(Validators.number("Validator input harus berisi angka"));
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

      <Components.Card header="Example Form">
        <Components.Form.Group
          label="Validators Required"
          required={!form.get("validators").readonly}
        >
          <Components.Form.Radio
            control={form.get("validators") as FormControl}
            options={state.validatorsList}
            onChange={handleChangeValidators}
          />
        </Components.Form.Group>

        <Components.Form.Group
          label="Validators Input"
          required={form.get("validators").value?.id === 2}
        >
          <Components.Form.Input.Text
            control={form.get("validatorsInput") as FormControl}
            placeholder="Masukkan beberapa karakter untuk divalidasi"
          />
        </Components.Form.Group>

        <Components.Form.Group
          label="Alphanumeric"
          required={!form.get("alphaNumeric").readonly}
        >
          <Components.Form.Input.AlphaNumeric
            control={form.get("alphaNumeric") as FormControl}
            placeholder="Masukkan alphanumeric Anda"
          />
        </Components.Form.Group>

        <Components.Form.Group
          label="Currency"
          required={!form.get("currency").readonly}
        >
          <Components.Form.Input.Currency
            control={form.get("currency") as FormControl}
            placeholder="Masukkan currency Anda"
          />
        </Components.Form.Group>

        <Components.Form.Group label="Tel" required={!form.get("tel").readonly}>
          <Components.Form.Input.Tel
            control={form.get("tel") as FormControl}
            placeholder="Masukkan nomor hp Anda"
          />
        </Components.Form.Group>
      </Components.Card>

      <Components.Card
        header="User Control"
        headerRight={() => (
          <div>
            <button
              className="btn btn-secondary btn-sm me-2"
              onClick={() => {
                control.reset();
              }}
            >
              Reset
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                control.validate();
                if (control.isValid) {
                  // save to backend
                  console.log(control.value);
                }
              }}
            >
              Submit
            </button>
          </div>
        )}
      >
        <Components.Form.Group label="NPWP" required={!control.readonly}>
          <Components.Form.Input.Numeric
            control={control}
            placeholder="Masukkan NPWP Anda"
          />
        </Components.Form.Group>
      </Components.Card>

      <Components.Card
        header="User Form"
        headerRight={() => (
          <div>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => {
                form.setReadOnly();
              }}
            >
              Read Only Form
            </button>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => {
                form.setReadOnly(false);
              }}
            >
              Write Form
            </button>
          </div>
        )}
      >
        <form onSubmit={handleSubmit}>
          <Components.Form.Group
            label="Code"
            required={!form.get("code").readonly}
          >
            <Components.Form.Input.Text
              control={form.get("code") as FormControl}
              placeholder="Masukkan code Anda"
            />
          </Components.Form.Group>

          <Components.Form.Group
            label="Nama"
            required={!form.get("name").readonly}
          >
            <Components.Form.Input.Text
              control={form.get("name") as FormControl}
              placeholder="Masukkan nama Anda"
            />
          </Components.Form.Group>

          <Components.Form.Group
            label="NIK"
            required={!form.get("nik").readonly}
          >
            <Components.Form.Input.Numeric
              control={form.get("nik") as FormControl}
              placeholder="Masukkan NIK Anda"
            />
          </Components.Form.Group>

          <Components.Form.Group
            label="Email"
            required={!form.get("email").readonly}
          >
            <Components.Form.Input.Email
              control={form.get("email") as FormControl}
              placeholder="Masukkan email Anda"
            />
          </Components.Form.Group>

          <Components.Form.Group
            label="Tanggal Lahir"
            required={!form.get("dob").readonly}
          >
            <Components.Form.Input.Date
              control={form.get("dob") as FormControl}
              placeholder="Masukkan tanggal lahir Anda"
            />
          </Components.Form.Group>

          <Components.Form.Group
            label="Usia"
            required={!form.get("age").readonly}
          >
            <Components.Form.Input.Number
              control={form.get("age") as FormControl}
              placeholder="Masukkan usia Anda"
            />
          </Components.Form.Group>

          <Components.Form.Group
            label="Status Perkawinan"
            required={!form.get("maritalStatus").readonly}
          >
            <Components.Form.Select
              placeholder="Pilih status perkawinan"
              options={state.statusPerkawinanList}
              control={form.get("maritalStatus") as FormControl}
              onChange={onChangeMaritalStatus}
            />
          </Components.Form.Group>

          {form.get("no_akta_menikah") && (
            <Components.Form.Group
              label="Nomor Akta Menikah"
              required={!form.get("no_akta_menikah").readonly}
            >
              <Components.Form.Input.Text
                control={form.get("no_akta_menikah") as FormControl}
                placeholder="Masukkan nomor akta menikah"
              />
            </Components.Form.Group>
          )}

          {form.get("no_akta_meninggal") && (
            <Components.Form.Group
              label="Nomor Akta Meninggal"
              required={!form.get("no_akta_meninggal").readonly}
            >
              <Components.Form.Input.Text
                control={form.get("no_akta_meninggal") as FormControl}
                placeholder="Masukkan nomor akta meninggal"
              />
            </Components.Form.Group>
          )}

          <Components.Form.Group
            label="Jenis Kelamin"
            required={!form.get("gender").readonly}
          >
            <Components.Form.Radio
              control={form.get("gender") as FormControl}
              options={state.jenisKelaminList}
            />
          </Components.Form.Group>

          <Components.Form.Group
            label="Hobi"
            required={!form.get("hobi").readonly}
          >
            <Components.Form.CheckBox
              control={form.get("hobi") as FormControl}
              options={state.hobiList}
            />
          </Components.Form.Group>

          <Components.Form.Group>
            <Components.Form.CheckBox
              control={form.get("termAndCondition") as FormControl}
              placeholder="Term and condition"
            />
          </Components.Form.Group>

          <div className="my-4">
            <button
              className="btn btn-primary"
              onClick={() => addAddressFormArray()}
              type="button"
            >
              Add Address
            </button>
            {(form.get("address").controls as Array<FormGroup>).map(
              (formGroup: FormGroup, index) => (
                <Components.Card
                  header={"Alamat ke-" + (index + 1)}
                  key={index}
                  headerRight={() => (
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => {
                        const formArray: FormArray = form.get(
                          "address"
                        ) as FormArray;
                        formArray.removeAt(index);
                      }}
                    >
                      <em className="fas fa-times" />
                    </button>
                  )}
                >
                  <Components.Form.Group
                    label="Street"
                    required={!formGroup.get("street").readonly}
                  >
                    <Components.Form.TextArea
                      control={formGroup.get("street") as FormControl}
                      placeholder="Masukkan nama jalan"
                    />
                  </Components.Form.Group>

                  <Components.Form.Group
                    label="Desa"
                    required={!formGroup.get("village").readonly}
                  >
                    <Components.Form.Input.Text
                      control={formGroup.get("village") as FormControl}
                      placeholder="Masukkan nama desa"
                    />
                  </Components.Form.Group>

                  <Components.Form.Group
                    label="Kecamatan"
                    required={!formGroup.get("subDistrict").readonly}
                  >
                    <Components.Form.Input.Text
                      control={formGroup.get("subDistrict") as FormControl}
                      placeholder="Masukkan nama kecamatan"
                    />
                  </Components.Form.Group>

                  <Components.Form.Group
                    label="Kabupaten"
                    required={!formGroup.get("district").readonly}
                  >
                    <Components.Form.Input.Text
                      control={formGroup.get("district") as FormControl}
                      placeholder="Masukkan nama kabupaten"
                    />
                  </Components.Form.Group>

                  <Components.Form.Group
                    label="Provinsi"
                    required={!formGroup.get("province").readonly}
                  >
                    <Components.Form.Input.Text
                      control={formGroup.get("province") as FormControl}
                      placeholder="Masukkan nama provinsi"
                    />
                  </Components.Form.Group>

                  <Components.Form.Group
                    label="Negara"
                    required={!formGroup.get("country").readonly}
                  >
                    <Components.Form.Input.Text
                      control={formGroup.get("country") as FormControl}
                      placeholder="Masukkan nama negara"
                    />
                  </Components.Form.Group>

                  <Components.Form.Group
                    label="Kode POS"
                    required={!formGroup.get("zipCode").readonly}
                  >
                    <Components.Form.Input.Numeric
                      control={formGroup.get("zipCode") as FormControl}
                      placeholder="Masukkan kodepos"
                    />
                  </Components.Form.Group>
                </Components.Card>
              )
            )}
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-secondary me-2"
              type="button"
              onClick={() => {
                form.reset();
              }}
            >
              Reset
            </button>
            <button className="btn btn-primary">
              <i className="fa-solid fa-paper-plane"></i> Save
            </button>
          </div>
        </form>
      </Components.Card>
    </div>
  );
}

export default App;
