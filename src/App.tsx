import "./App.scss";
import { Components } from "./shared/components";

function App() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.target);
    console.log(Object.fromEntries(formData.entries()));
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
              <label className="mb-1" htmlFor="name">
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
              <label className="mb-1" htmlFor="name">
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
              <label className="mb-1" htmlFor="name">
                Alamat
              </label>
              <textarea
                className="form-control"
                name="address"
                placeholder="Masukkan alamat Anda"
              />
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
