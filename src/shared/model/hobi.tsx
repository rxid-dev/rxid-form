export class HobiModel {
  private static instances: Array<HobiModel>;
  constructor(public id: number, public name: string) {}

  public static getById(id: number | null): HobiModel | null {
    if (!id) return null;
    if (!this.instances) this.createList();
    return this.instances.filter((hobi) => hobi.id === id)[0];
  }

  public static createList(): Array<HobiModel> {
    if (this.instances) return this.instances;
    const hobiList = [
      "Ngoding",
      "Bernyanyi",
      "Jalan-jalan",
      "Memasak",
      "Bermain Game",
      "Dan lain-lain",
    ];
    this.instances = hobiList.map(
      (hobi, index) => new HobiModel(index + 1, hobi)
    );
    return this.instances;
  }
}
