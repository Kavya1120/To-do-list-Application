export interface TodoInterface {
    task_Id?: string | null;
    title: string;
    dueDate: Date;
    isComplete: boolean;
    createdDate: Date;
    modifiedDate:Date;
}