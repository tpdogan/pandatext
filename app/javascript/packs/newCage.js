const newCage = document.getElementById('new_cage_button')
if (newCage) {
  newCage.addEventListener('click', () => {
    const name = prompt('Cage name (min 6 characters):')
    if (name.length > 6) {
      const cageForm = document.getElementById('new_cage')
      const cageName = document.getElementById('cage_name')
      cageName.value = name
      cageForm.submit()
    } else {
      alert('Cage name cannot be shorter than 6 characters!')
    }
  })
}