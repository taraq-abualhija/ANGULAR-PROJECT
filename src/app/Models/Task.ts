export class Task {
  constructor(
    public title: string,
    public description: string,
    public assignedTo: string,
    public date: string,
    public priority: string,
    public status: string,
    public id?: string
  ) {}
}
