import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector("#add-todo-popup .popup__form");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(isCompletedNow) {
  todoCounter.updateCompleted(isCompletedNow);
}

function handleDelete(wasCompleted) {
  todoCounter.updateTotal(false);
  if (wasCompleted) {
    todoCounter.updateCompleted(false);
  }
}

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
}

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const el = generateTodo(item);
    section.addItem(el);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    const id = uuidv4();
    let dateObj;
    if (values.date) {
      dateObj = new Date(values.date);
      dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
    }

    const todoEl = generateTodo({
      id,
      name: values.name,
      date: dateObj,
      completed: false,
    });

    section.addItem(todoEl);

    todoCounter.updateTotal(true);

    new FormValidator(validationConfig, addTodoForm).resetValidation?.();
    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => addTodoPopup.open());

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
