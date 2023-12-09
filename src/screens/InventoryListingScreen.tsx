/* eslint-disable no-lone-blocks */
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import LikeIcon from '../assets/icons/like.svg';
import ThumbIcon from '../assets/icons/thumb.svg';
import CarIcon from '../assets/icons/car.svg';
import EyeIcon from '../assets/icons/eye.svg';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {handleReduxInventoryList} from '../redux/inventory/InventorySlice';
import LoadingComponent from '../components/LoadingComponent';

const InventoryListingScreen = () => {
  const {result} = useSelector((state: RootState) => state.login);
  const [inventoryData, setInventoryData] = useState(null);
  const authToken = result.data.sessionToken;
  const auctionId = '654c6e0e4c178569c7bc607f';
  const dispatch = useDispatch<AppDispatch>();

  // function to fetch the inventory data from api
  const fetchInventoryData = async (id: any) => {
    const res = await dispatch(handleReduxInventoryList({id, authToken}));
    setInventoryData(res.payload.data);
    const responseData = res.payload;
    if (res.payload && res.payload.success) {
    } else {
      console.log('Response Error:', responseData.message);
    }
  };

  //useEffect to call the data fetching function after 2 seconds
  useEffect(() => {
    let fetchTimeOut: any;
    const fetchDataInterval = () => {
      fetchInventoryData(auctionId);
      fetchTimeOut = setTimeout(fetchDataInterval, 20000);
    };
    fetchDataInterval();

    return () => clearTimeout(fetchTimeOut);
  });
  const formatDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const padZero = (num: any) => (num < 10 ? `0${num}` : num);
    const formattedDate = `${padZero(date.getHours())}:${padZero(
      date.getMinutes(),
    )}:${padZero(date.getSeconds())} ${padZero(
      date.getDate(),
    )} ${new Intl.DateTimeFormat('en-US', {month: 'long'}).format(
      date,
    )}, ${date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    })}`;

    return formattedDate;
  };
  {
    if (inventoryData === null) {
      return <LoadingComponent />;
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.limitText}>Remaining Buying Limit</Text>
        <Text style={styles.limitAmount}>$82,00,000</Text>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.topButton}
              // onPress={() => fetchInventoryData(auctionId)}
            >
              <Text style={styles.buttonText}>Live inventory</Text>
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>Completed</Text>
            </View>
          </View>
          <View style={styles.nameContainer}>
            <View style={styles.nameTextContainer}>
              <Text style={styles.nameHead}>Auction Name: </Text>
              <Text style={styles.name}>
                {inventoryData[0].inventory.auction.name}(
                {inventoryData[0].inventory.auction.auctionNo})
              </Text>
            </View>
            <View style={styles.likeContainer}>
              <LikeIcon />
            </View>
          </View>
          <FlatList
            data={inventoryData}
            renderItem={({item}) => {
              return (
                <View>
                  <View style={styles.detailsContainer}>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.image}
                        source={require('../assets/images/Car.png')}
                      />
                      <View style={styles.reportButton}>
                        <Text style={styles.autoBidText}>
                          View Inspection Report
                        </Text>
                      </View>
                      <View style={styles.eyeIconContainer}>
                        <EyeIcon />
                      </View>
                      <View style={styles.carDetails}>
                        <Text style={styles.detailText}>AP29BXXXX</Text>
                        <Text style={styles.detailText}>•</Text>
                        <Text style={styles.detailText}>
                          {item.inventory.vehicleInfo.fuelType}
                        </Text>
                        <Text style={styles.detailText}>•</Text>
                        <Text style={styles.detailText}>
                          {item.inventory.vehicleInfo.mfgYear}
                        </Text>
                        <Text style={styles.detailText}>38000kms</Text>
                      </View>
                    </View>
                    <View style={styles.nameContainer}>
                      <Text style={styles.vehicleName}>
                        {`${item.inventory.vehicleInfo.model} ${item.inventory.vehicleInfo.make}`}
                      </Text>
                      <View style={styles.likeContainer}>
                        <LikeIcon />
                      </View>
                    </View>
                    <View style={styles.subDetailsContainer}>
                      <View style={styles.typeContainer}>
                        <View style={styles.typeIcon}>
                          <CarIcon height={22} width={22} />
                        </View>
                        <Text style={styles.typeText}>
                          {item.inventory.vehicleType.name}
                        </Text>
                        <Text style={styles.place}>
                          {item.inventory.yardLocation}
                        </Text>
                        <Text style={styles.remark}>Remark</Text>
                      </View>
                      <View style={styles.likeIcon}>
                        <ThumbIcon height={15} width={15} />
                      </View>
                    </View>
                    <View style={styles.section}>
                      <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>
                          {formatDate(item.inventory.endTimestamp).slice(0, 8)}
                        </Text>
                        <Text style={styles.dateText}>
                          {formatDate(item.inventory.endTimestamp).slice(9)}
                        </Text>
                        <Text style={styles.endText}>End time</Text>
                      </View>
                      <View style={styles.bidContainer}>
                        <Text style={styles.bidCount}>
                          {item.inventory.totalBidCount}
                        </Text>
                        <Text style={styles.bidText}>Bids</Text>
                      </View>
                      <View style={styles.commentContainer}>
                        <Text style={styles.reserveText}>Reserve Met</Text>
                        <Text style={styles.commentText}>
                          Comment ({item.inventory.commentsCount})
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.tipText}>
                      Tip :Swift Dezire was approved @ 5 lakh in Previous
                      auctions
                    </Text>
                    {item.inventory.totalBidCount !== 0 && (
                      <>
                        <View style={styles.bidButtonContainer}>
                          <View style={styles.autoBidButton}>
                            <Text style={styles.autoBidText}>Set Auto Bid</Text>
                          </View>
                          <View style={styles.placeBidButton}>
                            <Text style={styles.placeBidText}>Place Bid</Text>
                          </View>
                        </View>
                        <View style={styles.bidDetailsContainer}>
                          <View style={styles.heighBidContainer}>
                            <Text style={styles.heighBidText}>
                              {`Heights Bid- ${item.highestInventoryBid.amount}`}
                            </Text>
                          </View>
                          <View style={styles.remainBidContainer}>
                            <Text style={styles.remainBidText}>
                              20 Bid Remaining
                            </Text>
                          </View>
                        </View>
                      </>
                    )}
                  </View>
                </View>
              );
            }}
            //keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default InventoryListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    zIndex: 2,
  },
  contentContainer: {
    marginTop: 60,
    width: '100%',
    flex: 1,
  },
  topContainer: {
    position: 'absolute',
    top: 100,
    height: 120,
    width: '100%',
    backgroundColor: '#F7B40D',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    zIndex: 1,
  },
  limitText: {
    color: 'black',
    fontSize: 12,
  },
  limitAmount: {
    color: 'black',
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 50,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
  },
  topButton: {
    backgroundColor: '#F7B40D',
    height: 40,
    width: '45%',
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    height: 40,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  nameTextContainer: {
    flexDirection: 'row',
  },
  nameHead: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 15,
  },
  name: {color: 'black'},
  likeContainer: {
    height: 25,
    width: 25,
    backgroundColor: 'black',
    borderRadius: 5,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    width: '93%',
    alignSelf: 'center',
    height: 'auto',
    marginVertical: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  reportButton: {
    backgroundColor: 'white',
    height: 30,
    width: 'auto',
    position: 'absolute',
    borderRadius: 5,
    top: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  eyeIconContainer: {
    backgroundColor: 'white',
    height: 25,
    width: 25,
    position: 'absolute',
    top: 10,
    right: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carDetails: {
    backgroundColor: 'white',
    height: 20,
    width: '90%',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  detailText: {
    color: 'black',
  },
  vehicleName: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 15,
    fontSize: 18,
  },
  subDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  typeIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeText: {
    color: 'black',
    marginHorizontal: 10,
  },
  place: {
    color: 'black',
    marginHorizontal: 15,
  },
  remark: {
    color: 'black',
    textDecorationLine: 'underline',
    marginHorizontal: 10,
  },
  likeIcon: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  section: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  timeContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  timeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  dateText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
    marginVertical: 5,
  },
  endText: {
    color: 'black',
  },
  bidContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bidCount: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bidText: {
    color: 'black',
  },
  commentContainer: {},
  reserveText: {
    color: 'green',
  },
  commentText: {
    color: 'black',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  tipText: {
    color: 'black',
    marginVertical: 10,
    marginHorizontal: 15,
    fontSize: 12,
  },
  bidButtonContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  autoBidButton: {
    height: 50,
    width: '48%',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  autoBidText: {
    color: 'black',
    fontWeight: 'bold',
  },
  placeBidButton: {
    height: 50,
    width: '48%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7B40D',
  },
  placeBidText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bidDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  heighBidContainer: {
    width: '50%',
  },
  heighBidText: {
    color: 'black',
  },
  remainBidContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainBidText: {
    color: 'black',
  },
});
