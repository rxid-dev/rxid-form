import { useState } from "react";
import "./App.scss";
import { Components } from "./shared/components";
import { JenisKelamin, StatusPerkawinanModel } from "./shared/model";

function App() {
  const [state] = useState({
    statusPerkawinanList: StatusPerkawinanModel.createList(),
    jenisKelaminList: JenisKelamin.createList(),
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.target);
    const { maritalStatus, jenisKelamin, ...dto }: { [key: string]: any } =
      Object.fromEntries(formData.entries()) || {};
    dto.maritalStatus = StatusPerkawinanModel.getById(
      maritalStatus ? +maritalStatus : null
    );

    dto.jenisKelamin = JenisKelamin.getById(
      jenisKelamin ? +jenisKelamin : null
    );

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
              <label className="mb-1" htmlFor="name">
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
