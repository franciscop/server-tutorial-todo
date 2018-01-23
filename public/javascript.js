const itemize = item => `
  <li class="collection-item">
    ${item.text}
    <div class="secondary-content">
        <i id=${item._id} class="done material-icons ${item.done ? 'active' : ''}">done</i>
      <i id=${item._id} class="delete material-icons">delete</i>
    </div>
  </li>
`;



// POST to /todo
// Create a new item
$('form.item').on('submit', async e => {
  e.preventDefault();
  const text = $(e.target).find('input').val();
  const saved = await axios.post('/todo', { text });
  $('ul').prepend(itemize(saved.data));
  e.target.reset();
  $(e.target).find('input').blur();
});

// PUT /todo/:id
// When pressing on the checkbox (either way)
$('ul').on('click', '.done', async e => {
  const done = !e.target.classList.contains('active');
  const list = await axios.put(`/todo/${e.target.id}`, { done });
  $(e.target).toggleClass('active');
});

// DELETE /todo/:id
// Press on the "trash"
$('ul').on('click', '.delete', async e => {
  const data = await axios.delete(`/todo/${e.target.id}`);
  $(e.target).closest('li').remove();
});

// Populate the list for the first time through the API
axios.get('/todo').then(list => {
  $('ul').html('').append(list.data.map(itemize).join(''));
});
