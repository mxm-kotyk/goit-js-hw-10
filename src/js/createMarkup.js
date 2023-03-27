function createListMarkup(result) {
  return result
    .map(
      ({
        name,
        flags,
      }) => `<li style="list-style: none;font-size: 1.5rem;font-weight: 500;display: flex;align-items: center;gap: 10px"
><img src='${flags.svg}' alt='${flags.alt}' width=50 style='border: 1px solid #ccc'>${name.official}</li>`
    )
    .join('');
}

function createCardMarkup(result) {
  return result.map(
    ({ name, capital, population, languages, flags }) => `
  <div style='margin: 10px; display: flex; align-items: center; gap: 1rem'>
    <img src='${flags.svg}' alt='${
      flags.alt
    }' width=80 style='border: 1px solid #ccc'>
    <span style='font-weight: 500; font-size: 3rem'>${name.official}</span>
  </div>
  <ul style="list-style: none; margin: 10px; padding: 0;font-size: 1.5rem">
    <li><span style='font-weight: 700'>Capital:</span><span style='margin-left: 0.3rem'>${capital}</span></li>
    <li><span style='font-weight: 700'>Population:</span><span style='margin-left: 0.3rem'>${population}</span></li>
    <li><span style='font-weight: 700'>Languages:</span><span style='margin-left: 0.3rem'>${Object.values(
      languages
    )}</span></li>
  </ul>`
  );
}

export { createListMarkup, createCardMarkup };
