namespace To_do_list_Application.Models
{
    public interface IToDoApplicationDatabaseSettings
    {
        string ToDoListCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
