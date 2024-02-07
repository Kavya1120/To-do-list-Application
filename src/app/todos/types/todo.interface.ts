export interface TodoInterface {
    task_Id?: string | null;
    title: string;
    description: string;
    dueDate: Date;
    isComplete: boolean;
    createdDate: Date;
    modifiedDate:Date;
}