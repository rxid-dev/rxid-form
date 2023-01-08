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
  });

  const [record, setRecord] = useState<{ [key: string]: any }>({
    name: "",
    dob: "",
    age: "",
    address: "",
    maritalStatus: 0,
    gender: 0,
    termAndCondition: false,
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
      setRecord(record);
    }, 5000);
  }, []);

  const handleOnChange = (e: any) => {
    setRecord((record) => ({
      ...record,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { maritalStatus, gender, ...dto } = record;

    dto.maritalStatus = StatusPerkawinanModel.getById(maritalStatus);
    dto.gender = JenisKelaminModel.getById(gender);
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
              className="form-control"
              name="name"
              placeholder="Masukkan nama Anda"
              value={record.name}
              onChange={handleOnChange}
            />
          </Components.Form.Group>

          <Components.Form.Group label="Tanggal Lahir" required={true}>
            <input
              type="date"
              className="form-control"
              name="dob"
              placeholder="Pilih tanggal lahir Anda"
              value={record.dob}
              onChange={handleOnChange}
            />
          </Components.Form.Group>

          <Components.Form.Group label="Usia" required={true}>
            <input
              type="number"
              className="form-control"
              name="age"
              placeholder="Masukkan usia Anda"
              value={record.age}
              onChange={handleOnChange}
            />
          </Components.Form.Group>

          <Components.Form.Group label="Alamat" required={true}>
            <textarea
              className="form-control"
              name="address"
              placeholder="Masukkan alamat Anda"
              value={record.address}
              onChange={handleOnChange}
            />
          </Components.Form.Group>

          <Components.Form.Group label="Status Perkawinan" required={true}>
            <select
              className="form-select"
              name="maritalStatus"
              value={record.maritalStatus}
              onChange={handleOnChange}
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
                  name="gender"
                  id={"jenisKelamin" + jenisKelamin.id}
                  value={jenisKelamin.id}
                  checked={jenisKelamin.id === +record.gender}
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
                checked={!!record.termAndCondition}
                onChange={(e) =>
                  setRecord((record) => ({
                    ...record,
                    termAndCondition: e.target.checked,
                  }))
                }
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
