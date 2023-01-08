import { useEffect, useState } from "react";
import "./App.scss";
import { Components } from "./shared/components";
import {
  CheckboxModel,
  HobiModel,
  JenisKelaminModel,
  StatusPerkawinanModel,
} from "./shared/model";

function App() {
  const [state, setState] = useState({
    statusPerkawinanList: StatusPerkawinanModel.createList(),
    jenisKelaminList: JenisKelaminModel.createList(),
    hobiList: CheckboxModel.createList(HobiModel.createList()),
    record: {
      name: "",
      dob: "",
      age: "",
      address: "",
      maritalStatus: 0,
      gender: 0,
      termAndCondition: false,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      console.log("INFO: Received data from api");
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
        record,
        hobiList,
      }));

      const maritalStatusElement = document.getElementsByName(
        "maritalStatus"
      )[0] as HTMLSelectElement;
      maritalStatusElement.value = String(record.maritalStatus);

      const genderElements = document.getElementsByName("jenisKelamin");
      for (let i = 0; i < genderElements.length; i++) {
        const genderElement = genderElements[i] as HTMLInputElement;
        genderElement.checked = +genderElement.value === record.gender;
      }
    }, 1000);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.target);
    const {
      maritalStatus,
      jenisKelamin,
      termAndCondition,
      ...dto
    }: { [key: string]: any } = Object.fromEntries(formData.entries()) || {};
    dto.maritalStatus = StatusPerkawinanModel.getById(
      maritalStatus ? +maritalStatus : null
    );

    dto.jenisKelamin = JenisKelaminModel.getById(
      jenisKelamin ? +jenisKelamin : null
    );

    dto.hobi = CheckboxModel.getValues(state.hobiList);

    dto.termAndCondition = !!termAndCondition;

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
              className="form-control"
              name="name"
              placeholder="Masukkan nama Anda"
              defaultValue={state.record.name}
            />
          </Components.Form.Group>

          <Components.Form.Group label="Tanggal Lahir" required={true}>
            <input
              type="date"
              className="form-control"
              name="dob"
              placeholder="Pilih tanggal lahir Anda"
              defaultValue={state.record.dob}
            />
          </Components.Form.Group>

          <Components.Form.Group label="Usia" required={true}>
            <input
              type="number"
              className="form-control"
              name="age"
              placeholder="Masukkan usia Anda"
              defaultValue={state.record.age}
            />
          </Components.Form.Group>

          <Components.Form.Group label="Alamat" required={true}>
            <textarea
              className="form-control"
              name="address"
              placeholder="Masukkan alamat Anda"
              defaultValue={state.record.address}
            />
          </Components.Form.Group>

          <Components.Form.Group label="Status Perkawinan" required={true}>
            <select
              className="form-select"
              name="maritalStatus"
              defaultValue={state.record.maritalStatus}
            >
              <option value="">Pilih status perkawinan</option>
              {state.statusPerkawinanList.map((statusPerkawinan) => (
                <option value={statusPerkawinan.id} key={statusPerkawinan.id}>
                  {statusPerkawinan.name}
                </option>
              ))}
            </select>
          </Components.Form.Group>

          <Components.Form.Group label="Jenis Kelamin" required={true}>
            {state.jenisKelaminList.map((jenisKelamin) => (
              <div className="form-check" key={jenisKelamin.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="jenisKelamin"
                  id={"jenisKelamin" + jenisKelamin.id}
                  value={jenisKelamin.id}
                  defaultChecked={jenisKelamin.id === state.record.gender}
                />
                <label
                  className="form-check-label"
                  htmlFor={"jenisKelamin" + jenisKelamin.id}
                >
                  {jenisKelamin.name}
                </label>
              </div>
            ))}
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
                className="form-check-input"
                type="checkbox"
                id="termAndCondition"
                name="termAndCondition"
                defaultChecked={state.record.termAndCondition}
              />
              <label className="form-check-label" htmlFor="termAndCondition">
                Term and condition
              </label>
            </div>
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
