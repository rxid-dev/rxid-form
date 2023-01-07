export class StatusPerkawinanModel {
  private static instances: Array<StatusPerkawinanModel>;
  constructor(public id: number, public name: string) {}

  public static getById(id: number | null): StatusPerkawinanModel | null {
    if (!id) return null;
    if (!this.instances) this.createList();
    return this.instances.filter(
      (statusPerkawinan) => statusPerkawinan.id === id
    )[0];
  }

  public static createList(): Array<StatusPerkawinanModel> {
    if (this.instances) return this.instances;
    const statusPerkawinanList = [
      "Kawin",
      "Belum Kawin",
      "Cerai Hidup",
      "Cerai Mati",
    ];
    this.instances = statusPerkawinanList.map(
      (statusPerkawinan, index) =>
        new StatusPerkawinanModel(index + 1, statusPerkawinan)
    );
    return this.instances;
  }
}
