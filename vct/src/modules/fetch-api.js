export default function fetchApi(url) {
  return fetch(url)
    .then(results => results.json())
}
