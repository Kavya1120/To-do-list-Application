
using To_do_list_Application.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using To_do_list_Application.Services;

namespace To_do_list_Application
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            builder.Services.Configure<ToDoApplicationDatabaseSettings>(
                builder.Configuration.GetSection(nameof(ToDoApplicationDatabaseSettings)));
            
            builder.Services.AddSingleton<IToDoApplicationDatabaseSettings>(td => 
            td.GetRequiredService<IOptions<ToDoApplicationDatabaseSettings>>().Value);

            builder.Services.AddSingleton<IMongoClient>(s =>
                new MongoClient(builder.Configuration.GetValue<string>("ToDoApplicationDatabaseSettings:ConnectionString")));

            builder.Services.AddScoped<IToDoListService,  ToDoListService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
