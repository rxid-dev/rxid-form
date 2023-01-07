export class JenisKelamin {
  private static instances: Array<JenisKelamin>;
  constructor(public id: number, public name: string) {}

  public static getById(id: number | null): JenisKelamin | null {
    if (!id) return null;
    if (!this.instances) this.createList();
    return this.instances.filter((jenisKelamin) => jenisKelamin.id === id)[0];
  }

  public static createList(): Array<JenisKelamin> {
    if (this.instances) return this.instances;
    const jenisKelaminList = ["Laki-laki", "Perempuan"];
    this.instances = jenisKelaminList.map(
      (jenisKelamin, index) => new JenisKelamin(index + 1, jenisKelamin)
    );
    return this.instances;
  }
}
