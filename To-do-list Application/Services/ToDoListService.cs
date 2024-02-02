using To_do_list_Application.Models;
using MongoDB.Driver;

namespace To_do_list_Application.Services
{
    public class ToDoListService : IToDoListService

    {
        private readonly IMongoCollection<ToDoList> _collectionTasks;

        public ToDoListService(IToDoApplicationDatabaseSettings settings , IMongoClient mongoClient)
        {
           var database = mongoClient.GetDatabase(settings.DatabaseName);
           _collectionTasks = database.GetCollection<ToDoList>(settings.ToDoListCollectionName);
        }
        public ToDoList AddNewTask(ToDoList task)

        {
            _collectionTasks.InsertOne(task);
            return task;
        }

        public void DeleteTask(Guid taskId)
        {
            _collectionTasks.DeleteOne(task => task.Task_Id == taskId);
        }

        public List<ToDoList> GetAllTasks()
        {
            return _collectionTasks.Find(task => true).ToList();
        }

        public ToDoList GetTaskById(Guid taskId)
        {
            return _collectionTasks.Find(task => task.Task_Id == taskId ).FirstOrDefault();
        }

        public void UpdateTaskDetails(Guid taskId, ToDoList taskDetails)
        {
            _collectionTasks.ReplaceOne(task => task.Task_Id == taskId, taskDetails);
        }
    }
}
