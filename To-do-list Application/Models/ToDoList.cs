using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace To_do_list_Application.Models
{
    [BsonIgnoreExtraElements]
    public class ToDoList
    {
         [BsonId]
         [BsonRepresentation(BsonType.String)]
         public Guid Task_Id { get; set; }
         [BsonElement("title")]
         public string Title { get; set; }
         [BsonElement("description")]
         public string Description { get; set; }
         [BsonElement("duedate")]
         public DateTime? DueDate { get; set; }
         [BsonElement("completed")]
         public Boolean IsComplete {  get; set; }
         [BsonElement("createddate")]
         public DateTime CreatedDate { get; set; }
         [BsonElement("Modifieddate")]
         public DateTime ModifiedDate { get; set; }
    }
}
