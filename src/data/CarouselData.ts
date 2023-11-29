const CarouselData = [
  {
    id: 1,
    title: 'Không Ai Bị Bỏ Lại Phía Sau',
    imgSrc: require('../assets/images/TSTT.jpg'),
    imgPlaceholder: require('../assets/images/TSTT-placeholder.jpg'),
    to: '/about-us',
  },
  {
    id: 2,
    title: 'Thi Thử Vật Lý 1',
    imgSrc: require('../assets/images/IntroductionPic.jpg'),
    imgPlaceholder: require('../assets/images/Introduction-placeholder.jpg'),
    to: '/room/tests',
  },
  {
    id: 3,
    title: 'Thi Thử Hoá Đại Cương',
    imgSrc: require('../assets/images/LHOT_1.jpg'),
    imgPlaceholder: require('../assets/images/LHOT_1-placeholder.jpg'),
    to: '/room/tests',
  },
  {
    id: 4,
    title: 'Thi Thử Giải Tích 1',
    imgSrc: require('../assets/images/GSAX-Header.jpg'),
    imgPlaceholder: require('../assets/images/GSAX-Header-placeholder.jpg'),
    to: '/room/tests',
  },
];

const EventsAndActivities = [
  {
    id: '1',
    name: 'Gia sư áo xanh',
    imgSrc: require('../assets/images/GSAX.jpg'),
    imgPlaceholder: require('../assets/images/GSAX-placeholder.jpg'),
    linkTo: 'about-us/activities/gia-su-ao-xanh',
  },
  {
    id: '2',
    name: 'Lớp học ôn tập',
    imgSrc: require('../assets/images/LHOT.jpg'),
    imgPlaceholder: require('../assets/images/LHOT-placeholder.jpg'),
    linkTo: 'about-us/activities/lop-hoc-on-tap',
  },
  {
    id: '3',
    name: 'Sách cũ tri thức mới',
    imgSrc: require('../assets/images/SCTTM.jpg'),
    imgPlaceholder: require('../assets/images/SCTTM-placeholder.jpg'),
    linkTo: 'about-us/activities/sach-cu-tri-thuc-moi',
  },
  {
    id: '4',
    name: 'Tiếp sức tới trường',
    imgSrc: require('../assets/images/TSTT.jpg'),
    imgPlaceholder: require('../assets/images/TSTT-placeholder.jpg'),
    linkTo: 'about-us/activities/tiep-suc-toi-truong',
  },
];

const RevisionClassData = [
  {
    id: '1',
    name: 'NÀO CHÚNG TA CÙNG TIẾN!',
    description:
      'Vào thứ Bảy và Chủ nhật hằng tuần, tại nhà H6 Trường ĐH Bách Khoa ĐHQG-HCM (Cơ sở Dĩ An) có hàng trăm sinh viên đến tham gia lớp học mang tên Chúng ta cùng tiến.',
    date: '9 tháng 4, năm 2019',
    imgSrc: require('../assets/images/LHOTTTNews.png'),
    hRef: 'https://vnuhcm.edu.vn/sinh-vien_33386864/nao-chung-ta-cung-tien-/313930366864.html',
  },
];

export { CarouselData, EventsAndActivities, RevisionClassData };
