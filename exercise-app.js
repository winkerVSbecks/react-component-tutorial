const API_KEY = '2112d749415a3a55d88f35db5fc1eaaf';

const Weather = ({temp, description, icon}) => {
  return (
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
}
function reshapeData(data) {
    return ({
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    });
}
function getWeather() {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => reshapeData(data))
    .catch(error => console.log(error));
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp:0,
      description:"loading",
      icon: null,
    }
  }
  componentDidMount() {
    getWeather()
    .then(data => {
        this.setState({
          temp: data.temp,
          description: data.description,
          icon: data.icon
        });
      });
    this.timerID = setInterval(() => {
      getWeather()
      .then(data => {
        this.setState({
          temp: data.temp,
          description: data.description,
          icon: data.icon
        });
      });
    }
    ,15000);
    
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }
  render() {
    const {temp, description, icon} = this.state;
    // 
    return <Weather temp={temp} description={description} icon={icon} />
  }

}


ReactDOM.render(<App />, document.getElementById('exercise'));
