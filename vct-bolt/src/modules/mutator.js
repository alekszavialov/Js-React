export default function mutateCarouselOneItemData(data) {

} = () => {
    // fetchApi('../../fakeAPI/carouselOneItemData.json')
    //     .then(result => this.setState({
    //             carouselData: {
    //                 ...result, items: result.items.map(item =>
    //                     <CarouselBigItem item={item} key={Math.random()}/>
    //                 )
    //             }
    //         }
    //     ));
    // const result = require('../../fakeAPI/carouselOneItemData.json');
    // this.setState(
    //     {
    //         carouselAdData: result
    //     }
    // );
    this.props.onGetData('carouselOneItemData', 'carouselOneItemData');
};