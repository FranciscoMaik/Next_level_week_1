function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  const citiesSelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const ufValue = event.target.value;
  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/microrregioes`
  )
    .then((res) => res.json())
    .then((cities) => {
      for (city of cities) {
        citiesSelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
      }

      citiesSelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);
