using Microsoft.AspNetCore.Mvc;
using To_do_list_Application.Services;
using To_do_list_Application.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace To_do_list_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoListController : ControllerBase
    {
        private readonly IToDoListService toDoListService;

        public ToDoListController(IToDoListService toDoListService)
        {
            this.toDoListService = toDoListService;
        }
        // GET: api/<ToDoListController>
        [HttpGet]
        public ActionResult<List<ToDoList>> Get()
        {
            return toDoListService.GetAllTasks();
        }

        // GET api/<ToDoListController>/5
        [HttpGet("{id}")]
        public ActionResult<ToDoList> Get(Guid id)
        {
            var task = toDoListService.GetTaskById(id);
            if (task == null) 
            {
                return NotFound($"Task with id = {id} not found");
            }

            return task;
        }

        
        // POST api/<ToDoListController>
        [HttpPost]
        public ActionResult<ToDoList> Post([FromBody] ToDoList todolist)
        {
            toDoListService.AddNewTask(todolist);

            return CreatedAtAction(nameof(ToDoList), new { id = todolist.Task_Id }, todolist);
        }


        // PUT api/<ToDoListController>/5
        [HttpPut("{id}")]
        public ActionResult<ToDoList> Put(Guid id, [FromBody] ToDoList todolist)
        {
            var exisitingTask = toDoListService.GetTaskById(id);
            if (exisitingTask == null)
            {
                return NotFound("Task not found!");
            }

            toDoListService.UpdateTaskDetails(id, todolist);
            return Ok("Task Details Updated Successfully");
        }

        // DELETE api/<ToDoListController>/5
        [HttpDelete("{id}")]
        public ActionResult<ToDoList> Delete(Guid id)
        {
            var task = toDoListService.GetTaskById(id);
            if(task == null)
            {
                return NotFound("Task not found!");
            }
            toDoListService.DeleteTask(id);
            return Ok("Task Deleted Successfully!");
        }
    }
}
