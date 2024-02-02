namespace To_do_list_Application.Models
{
    public class ToDoApplicationDatabaseSettings:IToDoApplicationDatabaseSettings
    {
        public string ToDoListCollectionName { get; set; } = String.Empty;
       public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
    }
}
