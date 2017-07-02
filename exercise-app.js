function getWeather() {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(reshapeData);
}

function reshapeData() {

}


const Weather = ({ temp, description, icon }) => (
  <div className="bw2 ba blue dib pa3 bg-washed-blue">

    <div className="flex items-stretch mb2">
      <img src={icon} />

      <header className="ml3">
        <h1 className="f7 ttu tracked mt0 mb2 flex-auto dark-blue">Toronto</h1>
        <p className="f3 mv0">{ temp } ℃</p>
      </header>
    </div>

    <p className="mv0 f5 ttc">{ description }</p>
  </div>
);


const App = () => (
  <Weather
    temp={14.85}
    description="proximity shower rain"
    icon="http://openweathermap.org/img/w/10d.png"
  />
);



ReactDOM.render(<App />, document.getElementById('exercise'));