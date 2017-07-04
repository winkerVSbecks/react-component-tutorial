const API_KEY = 'cbde950e8a9a0ff5f7039bc0a8abbe59';

function getWeather() {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=${API_KEY}&units=metric`)
    .then(res => {
      if(!res.ok) {
        throw 'An error occurred!';
      }
      console.log('json', res.json())
      return res.json();
    })
    .then(function(data) {
      let reshapedData = reshapeData(data);
      console.log('reshapeData: ', reshapedData);
      this.setState({reshapedData});
    })
    .catch(error => console.error(error));
}

function reshapeData(data) {
  const newData = {
    temp: data.main.temp,
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
  };
  return newData;
}

class Weather extends React.Component {
  render() {
    return (
      <div className="bw2 ba blue dib pa3 bg-washed-blue">

      <div className="flex items-stretch mb2">
        <img src={this.props.icon} />

        <header className="ml3">
          <h1 className="f7 ttu tracked mt0 mb2 flex-auto dark-blue">Toronto</h1>
          <p className="f3 mv0">{this.props.temp} ℃</p>
        </header>
      </div>

      <p className="mv0 f5 ttc">{this.props.description}</p>
      </div>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 14.85,
      description: "proximity shower rain",
      icon: "http://openweathermap.org/img/w/10d.png",
    }
  }

  componentDidMount () {
    setInterval(function() {
      this.getWeather()
    }, 5000);
    // const data = setInterval(() => this.getWeather(), 3000);
    // console.log('this', this);
    // console.log('data', data)
    // this.setState({data});
  }

  render() {
    return (
      <Weather
        temp={this.state.temp}
        description={this.state.description}
        icon={this.state.icon}
      />
    )
  }
};


ReactDOM.render(<App />, document.getElementById('exercise'));
