function createListMarkup(result) {
  return result
    .map(
      ({
        name,
        flags,
      }) => `<li style="list-style: none;font-size: 1.5rem;font-weight: 500;display: flex;align-items: center;gap: 10px"
><img src='${flags.svg}' alt='${flags.alt}' width=50>${name.official}</li>`
    )
    .join('');
}

function createCardMarkup(result) {
  return result.map(
    ({ name, capital, population, languages, flags }) => `
  <div><img src='${flags.svg}' alt='${
      flags.alt
    }' width=80><span style='font-weight: 500'>${name.official}</span></div>
  <ul>
    <li><span style='font-weight: 500'>Capital:</span><span>${capital}</span></li>
    <li><span style='font-weight: 500'>Population:</span><span>${population}</span></li>
    <li><span style='font-weight: 500'>Languages:</span><span>${Object.values(
      languages
    )}</span></li>
  </ul>`
  );
}

export { createListMarkup, createCardMarkup };
