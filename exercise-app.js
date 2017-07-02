const API_KEY = '498beb84557a3e0a4b7b519c6c1134fa';

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

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { data: this.getWeather()};
  }

  render() {
    const { data } = this.state;
    return(
      <Weather temp={this.state.temp} description={this.state.description} icon={this.state.icon}/>
      )
  }

  getWeather() {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(this.reshapeData);
  }

  reshapeData = (data) => {
    this.setState({
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    })
  }

}

ReactDOM.render(<App />, document.getElementById('exercise'));