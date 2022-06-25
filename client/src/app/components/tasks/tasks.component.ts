import { Component, OnInit } from '@angular/core';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks() {
    return this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe(_ => {
      this.getTasks()
    });
  }

  toggleReminder(task: Task) {
    this.taskService.updateTaskReminder(!task.reminder, task.id).subscribe(_ => this.getTasks())
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe(_ => this.taskService.getTasks().subscribe(tasks => this.tasks = tasks) )
  }
}
