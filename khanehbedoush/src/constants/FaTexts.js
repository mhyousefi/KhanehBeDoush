import AdBoxPhoto1 from 'src/assets/images/icons/726446.svg'
import AdBoxPhoto2 from 'src/assets/images/icons/726488.svg'
import AdBoxPhoto3 from 'src/assets/images/icons/726499.svg'

export const _HomePageInfo = {
  'title': 'چرا خانه به دوش؟',
  'slogans': [
    'اطلاعات کامل و صحیح از املاک قابل معامله',
    'بدون محدودیت، ۲۴ ساعته و در تمام ایام هقته',
    'جستجوی هوشمند ملک، صرفه جویی در زمان',
    'تنوع در املاک، افزایش قدرت انتخاب مشتریان',
    'بانکی جامع از اطلاعات هزاران آگهی به روز',
    'دستیابی به نتیجه مطلوب در کمترین زمان ممکن',
    'همکاری با مشاوران متخصص در حوزه املاک',
  ],
}

export const AdBoxes = [
  {
    'title': 'آسان',
    'text': 'به سادگی صاحب خانه شوید',
    'image': AdBoxPhoto1,
  },
  {
    'title': 'مطمئن',
    'text': 'با خیال راحت به دنبال خانه بگیردید',
    'image': AdBoxPhoto2,
  },
  {
    'title': 'گسترده',
    'text': 'در منطقه مورد علاقه خود صاحب خانه شوید',
    'image': AdBoxPhoto3,
  },
]

export const messages = {
  'show phone number': 'مشاهده شماره مالک/مشاور',
  'insufficient credit': 'اعتبار شما برای مشاهده شماره مالک/مشاور این ملک کافی نیست.',
  'server error': 'خطایی در سرور رخ داد. لطفا لحظاتی دیگر دوباره تلاش کنید.',
  'invalid credit input': 'ورودی باید یک عدد بزرگ تر از صفر باشد!',
  'bank issue. try again': 'مشکلی در ارتباط با بانک به وجود آمد. لطفا دوباره تلاش کنید.',
  'invalid search params': 'ورودی های جستجو معتبر نیستند.',
  'loading': 'در حال بارگزاری، لطفا شکیبا باشید',
  'no results found': 'هیچ موردی پیدا نشد!',
  'non-existing house': 'اطلاعات خانه مورد نظر حذف شده اند!',
  'not logged in': 'شما وارد حساب کاربری خود نشده اید.',
  'wrong inputs': 'اطلاعات وارد شده صحیح نمی باشند!',
  'home added': 'خانه جدید اضافه شد.',
  'price not available': 'قیمت برای این ملک موجود نیست.',
}


export const testHouses = [
  {
    'id': '0',
    'phoneNumber': '09121103040',
    'dealType': 'sell',
    'propertyType': 'برج',
    'district': 'منهتن',
    'area': '400',
    'priceInfo': {
      'sellPrice': '500000000000',
      'rentPrice': '60000000',
      'basePrice': '100000000',
    },
    'image': 'https://www.newyorksightseeing.com/media/catalog/product/cache/29/thumbnail/9df78eab33525d08d6e5fb8d27136e95/e/s/esb_1_1.jpg',
    'description': 'ببین فقط باید بیای ببینیش یعنی!',
  },
  {
    'id': '1',
    'phoneNumber': '09121103041',
    'dealType': 'rental',
    'propertyType': 'آپارتمان',
    'district': 'قیطریه',
    'area': '220',
    'priceInfo': {
      'sellPrice': '1600000000',
      'rentPrice': '3000000',
      'basePrice': '280000000',
    },
    'image': 'https://blog.ihome.ir/wp-content/uploads/2017/02/apartment-price-in-tehran.jpg',
    'description': 'بدک نیست...',
  },
  {
    'id': '2',
    'phoneNumber': '09121103042',
    'dealType': 'sell',
    'propertyType': 'کلنگی',
    'district': 'نیاوران',
    'area': '170',
    'priceInfo': {
      'sellPrice': '15000000000',
      'rentPrice': '0',
      'basePrice': '0',
    },
    'image': 'https://media.isna.ir/content/1424276143505_1990.jpg/3',
    'description': 'میتونی باهاش یه برج با شکوه بسازی!',
  }
]