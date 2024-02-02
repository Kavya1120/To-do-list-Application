using To_do_list_Application.Models;
namespace To_do_list_Application.Services
{
    public interface IToDoListService
    {

        List<ToDoList> GetAllTasks();
        ToDoList GetTaskById(Guid taskId);
        ToDoList AddNewTask(ToDoList task);
        void UpdateTaskDetails(Guid taskId, ToDoList taskDetails);
        void DeleteTask(Guid taskId);
    }
}
