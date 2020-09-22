import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {Item, Card, CardItem, Body, Input, Picker, Button} from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: [],
      originCities: [],
      destinationCities: [],
      selectAsalProvince: null,
      selectoriginCity: null,
      selectTujuanProvince: null,
      selectdestinationCity: null,
      weight: 0,
      courier: null,
    };
  }

  componentDidMount() {
    this.onLoadProvinces();
  }

  onLoadProvinces = () => {
    fetch('https://api.rajaongkir.com/starter/province', {
      method: 'GET',
      headers: {
        key: '2c481eed8e3929ca6dbc35ca031910dc',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        let status = responseData['rajaongkir']['status']['code'];
        if (status == 200) {
          this.setState({
            provinces: responseData['rajaongkir']['results'],
          });
        }
      });
  };

  onOriginProvinceChange = val => {
    console.log(val);
    this.setState(
      {
        selectAsalProvince: val,
      },
      () => {
        fetch(
          'https://api.rajaongkir.com/starter/city?province=' +
            this.state.selectAsalProvince.province_id,
          {
            method: 'GET',
            headers: {
              key: '2c481eed8e3929ca6dbc35ca031910dc',
            },
          },
        )
          .then(response => response.json())
          .then(responseData => {
            console.log(responseData);
            let status = responseData['rajaongkir']['status']['code'];
            if (status == 200) {
              this.setState({
                originCities: responseData['rajaongkir']['results'],
              });
            }
          });
      },
    );
  };

  onDestinationProvincChange = val => {
    console.log(val);
    this.setState(
      {
        selectTujuanProvince: val,
      },
      () => {
        fetch(
          'https://api.rajaongkir.com/starter/city?province=' +
            this.state.selectTujuanProvince.province_id,
          {
            method: 'GET',
            headers: {
              key: '2c481eed8e3929ca6dbc35ca031910dc',
            },
          },
        )
          .then(response => response.json())
          .then(responseData => {
            console.log(responseData);
            let status = responseData['rajaongkir']['status']['code'];
            if (status == 200) {
              this.setState({
                destinationCities: responseData['rajaongkir']['results'],
              });
            }
          });
      },
    );
  };

  onChangeOriginCity = val => {
    this.setState({
      selectoriginCity: val,
    });
  };

  onChangeDestinationCity = val => {
    this.setState({
      selectdestinationCity: val,
    });
  };

  tampilkanDataItem = () => {
    let params = {
      originCity: this.state.selectoriginCity.city_id,
      destinationCity: this.state.selectdestinationCity.city_id,
      weight: this.state.weight,
      courier: this.state.courier,
    };
    console.log(params);
    Actions.details({
      data: params,
    });
  };

  render() {
    let provincesItem = <View> </View>;
    let originCityItem = <View> </View>;
    let tujuanProvinceItem = <View> </View>;
    let destinationCityItem = <View> </View>;

    //provinsi
    if (this.state.provinces) {
      provincesItem = this.state.provinces.map(prov => {
        return (
          <Picker.Item
            key={prov.province_id}
            label={prov.province}
            value={prov}
          />
        );
      });
    }

    if (this.state.provinces) {
      tujuanProvinceItem = this.state.provinces.map(prov => {
        return (
          <Picker.Item
            key={prov.province_id}
            label={prov.province}
            value={prov}
          />
        );
      });
    }

    //Kota
    if (this.state.originCities) {
      originCityItem = this.state.originCities.map(kota => {
        return (
          <Picker.Item key={kota.city_id} label={kota.city_name} value={kota} />
        );
      });
    }

    if (this.state.destinationCities) {
      destinationCityItem = this.state.destinationCities.map(kota => {
        return (
          <Picker.Item key={kota.city_id} label={kota.city_name} value={kota} />
        );
      });
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 20,
                top: 15,
              }}>
              Cek Ongkos Kirim
            </Text>
          </View>

          <View
            style={{
              margin: 5,
            }}>
            <Card>
              <CardItem header>
                <Text> Provinsi Asal </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      style={{
                        width: undefined,
                      }}
                      placeholder="Select your SIM"
                      placeholderStyle={{
                        color: '#bfc6ea',
                      }}
                      selectedValue={this.state.selectAsalProvince}
                      onValueChange={this.onOriginProvinceChange}>
                      {provincesItem}
                    </Picker>
                  </Item>
                </Body>
              </CardItem>

              <CardItem header>
                <Text>Kota Asal</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      style={{
                        width: undefined,
                      }}
                      placeholder="Select your SIM"
                      placeholderStyle={{
                        color: '#bfc6ea',
                      }}
                      selectedValue={this.state.selectoriginCity}
                      onValueChange={this.onChangeOriginCity}>
                      {originCityItem}
                    </Picker>
                  </Item>
                </Body>
              </CardItem>
            </Card>
          </View>

          <View
            style={{
              margin: 5,
            }}>
            <Card>
              <CardItem header>
                <Text> Alamat Tujuan </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      style={{
                        width: undefined,
                      }}
                      placeholder="Select your SIM"
                      placeholderStyle={{
                        color: '#C70039',
                      }}
                      selectedValue={this.state.selectTujuanProvince}
                      onValueChange={this.onDestinationProvincChange}>
                      {tujuanProvinceItem}
                    </Picker>
                  </Item>
                </Body>
              </CardItem>
              <CardItem header>
                <Text> Kota Tujuan </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      style={{
                        width: undefined,
                      }}
                      placeholder="Select your SIM"
                      placeholderStyle={{
                        color: '#bfc6ea',
                      }}
                      selectedValue={this.state.selectdestinationCity}
                      onValueChange={this.onChangeDestinationCity}>
                      {destinationCityItem}
                    </Picker>
                  </Item>
                </Body>
              </CardItem>
            </Card>
          </View>

          <View
            style={{
              margin: 5,
            }}>
            <Card>
              <CardItem header>
                <Text> Berat barang </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Input
                    placeholder="weight"
                    maxLength={5}
                    onChangeText={val => {
                      this.setState({
                        weight: val,
                      });
                    }}
                  />
                </Body>
              </CardItem>
            </Card>
          </View>

          <View
            style={{
              margin: 5,
            }}>
            <Card>
              <CardItem header>
                <Text> Kurir </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      style={{
                        width: undefined,
                      }}
                      placeholder="Select your SIM"
                      placeholderStyle={{
                        color: '#bfc6ea',
                      }}
                      selectedValue={this.state.courier}
                      onValueChange={val =>
                        this.setState({
                          courier: val,
                        })
                      }>
                      <Picker.Item label="JNE" value="jne" />
                      <Picker.Item label="POS" value="pos" />
                      <Picker.Item label="TIKI" value="tiki" />
                    </Picker>
                  </Item>
                </Body>
              </CardItem>
            </Card>
          </View>

          <View
            style={{
              margin: 10,
              alignContent: 'center',
            }}>
            <Button onPress={this.tampilkanDataItem}>
              <Text style={{color: 'white'}}> cek </Text>
            </Button>
          </View>

          <Text style={{textAlign: 'center'}}> By:Ismail MMR @2020</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'blue',
    height: 60,
  },
});
