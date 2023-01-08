import { useState } from "react";
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
      <div className="card my-4">
        <div className="card-header">
          <h2 className="mb-0">User Form</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="mb-1" htmlFor="name">
                Nama
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div className="mb-3">
              <label className="mb-1" htmlFor="dob">
                Tanggal Lahir
              </label>
              <input
                type="date"
                className="form-control"
                name="dob"
                placeholder="Pilih tanggal lahir Anda"
              />
            </div>

            <div className="mb-3">
              <label className="mb-1" htmlFor="age">
                Usia
              </label>
              <input
                type="number"
                className="form-control"
                name="age"
                placeholder="Masukkan usia Anda"
              />
            </div>

            <div className="mb-3">
              <label className="mb-1" htmlFor="address">
                Alamat
              </label>
              <textarea
                className="form-control"
                name="address"
                placeholder="Masukkan alamat Anda"
              />
            </div>

            <div className="mb-3">
              <label className="mb-1" htmlFor="maritalStatus">
                Status Perkawinan
              </label>
              <select className="form-select" name="maritalStatus">
                <option value="">Pilih status perkawinan</option>
                {state.statusPerkawinanList.map((statusPerkawinan) => (
                  <option value={statusPerkawinan.id} key={statusPerkawinan.id}>
                    {statusPerkawinan.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="mb-1" htmlFor="jenisKelamin">
                Jenis Kelamin
              </label>
              {state.jenisKelaminList.map((jenisKelamin) => (
                <div className="form-check" key={jenisKelamin.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="jenisKelamin"
                    id={"jenisKelamin" + jenisKelamin.id}
                    value={jenisKelamin.id}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={"jenisKelamin" + jenisKelamin.id}
                  >
                    {jenisKelamin.name}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <label className="mb-1" htmlFor="hobi">
                Hobi
              </label>
              {state.hobiList.map((hobi, i) => (
                <div className="form-check" key={hobi.option.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={"hobi" + hobi.option.id}
                    value={hobi.option.id}
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
            </div>

            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="termAndCondition"
                  name="termAndCondition"
                />
                <label className="form-check-label" htmlFor="termAndCondition">
                  Term and condition
                </label>
              </div>
            </div>

            <button className="btn btn-primary">
              <em className="fas fa-plus"></em> Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
