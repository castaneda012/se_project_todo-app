class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._total = todos.length;
    this._completed = todos.filter((t) => t.completed).length;
    this._updateText();
  }

  updateCompleted = (isCompleted) => {
    this._completed += isCompleted ? 1 : -1;
    if (this._completed < 0) this._completed = 0;
    if (this._completed > this._total) this._completed = this._total;
    this._updateText();
  };

  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    if (this._total < 0) this._total = 0;
    if (this._completed > this._total) this._completed = this._total;
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
