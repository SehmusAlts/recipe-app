export const recipes = [
    { 
        id: '1', 
        name: 'Omlet', 
        description: 'Lezzetli bir kahvaltılık omlet. 2 yumurta, tuz, karabiber, domates ve biber kullanarak yapabileceğiniz pratik bir kahvaltı tarifi.', 
        category: 'Kahvaltı', 
        image: 'https://cdn.pixabay.com/photo/2020/01/15/14/54/omelette-4768449_1280.jpg',
        ingredients: ['2 adet yumurta', 'Tuz', 'Karabiber', '1 adet domates', '1 adet biber', '2 yemek kaşığı sıvı yağ'],
        instructions: [
            '1. Yumurtaları bir kaseye kırın ve çırpın',
            '2. Tuz ve karabiber ekleyin',
            '3. Domates ve biberi küçük küçük doğrayın',
            '4. Tavaya sıvı yağı koyun ve ısıtın',
            '5. Yumurta karışımını tavaya dökün',
            '6. Üzerine doğranmış domates ve biberleri ekleyin',
            '7. İki tarafını da pişirin'
        ]
    },
    { 
        id: '2', 
        name: 'Köfte', 
        description: 'Ev yapımı nefis köfte tarifi. Kıyma, soğan, maydanoz ve baharatlarla hazırlanan, herkesin sevdiği bir lezzet.', 
        category: 'Ana Yemek', 
        image: 'https://cdn.pixabay.com/photo/2019/06/03/22/06/meat-4250123_1280.jpg',
        ingredients: ['500 gram kıyma', '1 adet soğan', '1 demet maydanoz', 'Tuz', 'Karabiber', 'Kimyon', 'Pul biber', '2 yemek kaşığı galeta unu'],
        instructions: [
            '1. Kıymayı geniş bir kaba alın',
            '2. Soğanı rendeleyin ve suyunu sıkın',
            '3. Maydanozu ince ince doğrayın',
            '4. Tüm malzemeleri kıymaya ekleyip iyice yoğurun',
            '5. Yumurta büyüklüğünde parçalar koparıp yassıltın',
            '6. Yapışmaz tavada veya ızgarada pişirin'
        ]
    },
    { 
        id: '3', 
        name: 'Pilav', 
        description: 'Mis gibi tereyağlı pilav. Her öğünün vazgeçilmez garnitürü, lezzetli ve doyurucu.', 
        category: 'Ana Yemek', 
        image: 'https://cdn.pixabay.com/photo/2017/07/16/11/57/fried-2509089_1280.jpg',
        ingredients: ['2 su bardağı pirinç', '3 su bardağı sıcak su', '2 yemek kaşığı tereyağı', '3 yemek kaşığı sıvı yağ', 'Tuz'],
        instructions: [
            '1. Pirinci bol su ile yıkayıp süzün',
            '2. Tencereye yağları koyup ısıtın',
            '3. Pirinci ekleyip kavurun',
            '4. Tuz ve sıcak suyu ekleyin',
            '5. Kısık ateşte pirinçler suyunu çekene kadar pişirin',
            '6. Ocaktan alıp 10-15 dakika demlenmeye bırakın'
        ]
    },
    { 
        id: '4', 
        name: 'Pancake', 
        description: 'Tatlı severler için enfes pancake. Kahvaltı veya ara öğün için ideal olan bu tarif, meyve ve bal ile servis edilebilir.', 
        category: 'Tatlı', 
        image: 'https://cdn.pixabay.com/photo/2017/05/07/08/56/pancakes-2291908_1280.jpg',
        ingredients: ['2 adet yumurta', '1 su bardağı süt', '2 su bardağı un', '3 yemek kaşığı şeker', '1 paket kabartma tozu', '1 paket vanilya', '2 yemek kaşığı sıvı yağ'],
        instructions: [
            '1. Tüm malzemeleri bir kapta çırpın',
            '2. Yapışmaz tavayı ısıtın',
            '3. Bir kepçe karışımı tavaya dökün',
            '4. Her iki tarafını da altın sarısı olana kadar pişirin',
            '5. Çilek, muz ve akçaağaç şurubu ile servis yapın'
        ]
    },
    { 
        id: '5', 
        name: 'Makarna', 
        description: 'Kremalı makarna tarifi. Ev yapımı kremalı sos ile hazırlanan bu makarna hem hızlı hem de lezzetli bir akşam yemeği seçeneği.', 
        category: 'Ana Yemek', 
        image: 'https://cdn.pixabay.com/photo/2019/05/16/20/48/pasta-4207809_1280.jpg',
        ingredients: ['500 gram makarna', '200 ml krema', '100 gram parmesan peyniri', '2 diş sarımsak', 'Tuz', 'Karabiber', 'Zeytinyağı'],
        instructions: [
            '1. Makarnayı tuzlu suda paketteki talimatlara göre pişirin',
            '2. Sarımsakları ince ince doğrayın',
            '3. Tavada zeytinyağı ile sarımsakları soteleyin',
            '4. Kremayı ekleyip kaynatın',
            '5. Rendelenmiş peyniri ekleyip karıştırın',
            '6. Süzülen makarnayı sosla karıştırın',
            '7. Tuz ve karabiber ile tatlandırın'
        ]
    },
    { 
        id: '6', 
        name: 'Cheesecake', 
        description: 'Mükemmel kıvamlı cheesecake. Labne peyniri ve bisküvi tabanı ile hazırlanan bu tatlı, mevsim meyveleriyle süslenebilir.', 
        category: 'Tatlı', 
        image: 'https://cdn.pixabay.com/photo/2016/11/29/11/38/cake-1869227_1280.jpg',
        ingredients: ['200 gram bisküvi', '100 gram tereyağı', '500 gram labne peyniri', '200 gram şeker', '3 adet yumurta', '1 paket vanilya', '200 ml krema'],
        instructions: [
            '1. Bisküvileri robottan geçirin',
            '2. Tereyağını eritip bisküviye ekleyin',
            '3. Karışımı tart kalıbının tabanına bastırarak yayın',
            '4. Labne peyniri, şeker, yumurta, vanilya ve kremayı karıştırın',
            '5. Bisküvi tabanının üzerine dökün',
            '6. 160 derece fırında 45-50 dakika pişirin',
            '7. Soğuduktan sonra buzdolabında en az 4 saat bekletin'
        ]
    },
    { 
        id: '7', 
        name: 'Çorba', 
        description: 'Sıcacık mercimek çorbası. Soğuk kış günlerinin vazgeçilmez lezzeti, bol proteinli ve besleyici.', 
        category: 'Çorba', 
        image: 'https://cdn.pixabay.com/photo/2018/01/01/17/57/soup-3054446_1280.jpg',
        ingredients: ['1 su bardağı kırmızı mercimek', '1 adet soğan', '1 adet havuç', '1 adet patates', '1 yemek kaşığı tereyağı', 'Tuz', 'Karabiber', 'Kırmızı biber'],
        instructions: [
            '1. Mercimeği yıkayıp süzün',
            '2. Soğan, havuç ve patatesi küçük küçük doğrayın',
            '3. Tencereye tereyağını koyup sebzeleri kavurun',
            '4. Mercimeği ekleyin ve karıştırın',
            '5. Üzerine 6 su bardağı su ekleyin',
            '6. Mercimekler yumuşayana kadar pişirin',
            '7. Blenderdan geçirip pürüzsüz hale getirin',
            '8. Tuz ve baharatlarla tatlandırın'
        ]
    },
    { 
        id: '8', 
        name: 'Kurabiye', 
        description: 'Çikolata parçacıklı enfes kurabiye. Çay saatleri için ideal, dışı çıtır içi yumuşak kurabiyeler.', 
        category: 'Tatlı', 
        image: 'https://cdn.pixabay.com/photo/2016/01/11/07/18/cookies-1133191_1280.jpg',
        ingredients: ['250 gram tereyağı', '1 su bardağı toz şeker', '1 adet yumurta', '1 paket vanilya', '3 su bardağı un', '1 paket kabartma tozu', '100 gram çikolata'],
        instructions: [
            '1. Tereyağı ve şekeri krema kıvamına gelene kadar çırpın',
            '2. Yumurta ve vanilyayı ekleyip karıştırın',
            '3. Un ve kabartma tozunu ekleyip yoğurun',
            '4. Çikolata parçalarını ekleyin',
            '5. Ceviz büyüklüğünde parçalar koparıp yağlı kağıt serilmiş tepsiye dizin',
            '6. 180 derece fırında 15 dakika pişirin'
        ]
    },
    { 
        id: '9', 
        name: 'Hamburger', 
        description: 'Evde yapabileceğiniz lezzetli hamburger. Ev yapımı köfte ve soslarla hazırlanan, restoran tadında bir hamburger.', 
        category: 'Fast Food', 
        image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg',
        ingredients: ['500 gram kıyma', 'Hamburger ekmeği', 'Marul', 'Domates', 'Soğan', 'Turşu', 'Cheddar peyniri', 'Hardal', 'Ketçap', 'Mayonez'],
        instructions: [
            '1. Kıymayı baharatlarla yoğurup köfteler hazırlayın',
            '2. Köfteleri tavada veya ızgarada pişirin',
            '3. Hamburger ekmeğini ortadan ikiye kesin ve hafifçe ısıtın',
            '4. Ekmeğin alt kısmına sosları sürün',
            '5. Sırasıyla marul, domates, soğan, köfte ve peyniri dizin',
            '6. Diğer yarım ekmeği üzerine kapatın'
        ]
    },
    { 
        id: '10', 
        name: 'Pizza', 
        description: 'Ev yapımı nefis pizza. İster klasik karışık, ister sadece peynirli, dilediğiniz malzemelerle hazırlanabilir.', 
        category: 'Fast Food', 
        image: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg',
        ingredients: ['2 su bardağı un', '1 paket instant maya', '1 çay kaşığı tuz', '1 çay kaşığı şeker', '2 yemek kaşığı zeytinyağı', '1 su bardağı ılık su', 'Domates sosu', 'Kaşar peyniri', 'Sucuk', 'Mantar', 'Yeşil biber'],
        instructions: [
            '1. Un, maya, tuz ve şekeri karıştırın',
            '2. Zeytinyağı ve ılık suyu ekleyip hamur haline getirin',
            '3. Hamuru 30 dakika mayalanmaya bırakın',
            '4. Hamuru açıp yuvarlak şekil verin',
            '5. Domates sosunu yayın',
            '6. Malzemeleri dizin ve üzerine peynir rendeleyin',
            '7. 200 derece fırında 15-20 dakika pişirin'
        ]
    },
    { 
        id: '11', 
        name: 'Salata', 
        description: 'Pratik ve sağlıklı mevsim salatası. İster ana yemek yanında, ister tek başına tüketebileceğiniz hafif bir seçenek.', 
        category: 'Atıştırmalık', 
        image: 'https://cdn.pixabay.com/photo/2016/08/18/18/40/salad-1603608_1280.jpg',
        ingredients: ['Marul', 'Domates', 'Salatalık', 'Yeşil biber', 'Kırmızı soğan', 'Beyaz peynir', 'Zeytin', 'Limon suyu', 'Zeytinyağı', 'Tuz'],
        instructions: [
            '1. Tüm sebzeleri yıkayın',
            '2. Marulu yaprak yaprak ayırın',
            '3. Domates ve salatalığı dilimleyin',
            '4. Biberi ve soğanı ince ince doğrayın',
            '5. Tüm malzemeleri bir kaseye alın',
            '6. Peynir ve zeytinleri ekleyin',
            '7. Zeytinyağı, limon suyu ve tuzu ekleyip karıştırın'
        ]
    },
    { 
        id: '12', 
        name: 'Brownie', 
        description: 'Çikolata severlerin favorisi brownie. Dışı hafif çıtır, içi nemli ve yoğun çikolatalı bu tatlı, dondurma ile servis edilebilir.', 
        category: 'Tatlı', 
        image: 'https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_1280.jpg',
        ingredients: ['200 gram bitter çikolata', '150 gram tereyağı', '3 adet yumurta', '1.5 su bardağı toz şeker', '1 paket vanilya', '1 su bardağı un', '1/2 çay kaşığı tuz', '1/2 su bardağı ceviz (isteğe bağlı)'],
        instructions: [
            '1. Çikolata ve tereyağını benmari usulü eritin',
            '2. Yumurta ve şekeri çırpın',
            '3. Erimiş çikolata karışımını ekleyip karıştırın',
            '4. Un, tuz ve vanilyayı ekleyin',
            '5. İsteğe bağlı olarak cevizleri ekleyin',
            '6. Karışımı yağlanmış kare kalıba dökün',
            '7. 180 derece fırında 25-30 dakika pişirin'
        ]
    },
    { 
        id: '13', 
        name: 'Menemen', 
        description: 'Klasik Türk kahvaltısı menemen. Domates, biber ve yumurtanın mükemmel uyumu, kahvaltı sofralarının vazgeçilmezi.', 
        category: 'Kahvaltı', 
        image: 'https://cdn.pixabay.com/photo/2019/03/26/19/51/food-4083565_1280.jpg',
        ingredients: ['3 adet domates', '2 adet yeşil biber', '1 adet soğan', '3 adet yumurta', '2 yemek kaşığı sıvı yağ', 'Tuz', 'Karabiber', 'Pul biber'],
        instructions: [
            '1. Soğanı küçük küçük doğrayın',
            '2. Biberleri ince ince doğrayın',
            '3. Domatesleri rendeleyin',
            '4. Tavaya yağı koyup soğanları kavurun',
            '5. Biberleri ekleyip 2-3 dakika kavurun',
            '6. Domatesleri ekleyip suyunu çekene kadar pişirin',
            '7. Yumurtaları kırıp karıştırın',
            '8. Baharatları ekleyip servis yapın'
        ]
    },
    { 
        id: '14', 
        name: 'Smoothie', 
        description: 'Sağlıklı meyve smoothie. Güne enerjik başlamak veya öğün aralarında atıştırmak için ideal, vitamin deposu içecek.', 
        category: 'İçecek', 
        image: 'https://cdn.pixabay.com/photo/2018/09/23/09/31/smoothie-3697014_1280.jpg',
        ingredients: ['1 adet muz', '1 avuç çilek', '1 avuç yaban mersini', '1 su bardağı süt veya yoğurt', '1 tatlı kaşığı bal', 'Buz (isteğe bağlı)'],
        instructions: [
            '1. Tüm meyveleri yıkayın ve hazırlayın',
            '2. Blender\'a meyveleri ekleyin',
            '3. Süt veya yoğurt ekleyin',
            '4. Tatlandırmak için bal ekleyin',
            '5. İsteğe bağlı olarak buz ekleyin',
            '6. Tüm malzemeleri pürüzsüz olana kadar karıştırın',
            '7. Hemen servis yapın'
        ]
    },
    { 
        id: '15', 
        name: 'Mantı', 
        description: 'Ev yapımı Türk mantısı. Zahmetli ama lezzetine değer, sarımsaklı yoğurt ve baharatlı sos ile servis edilen geleneksel lezzet.', 
        category: 'Ana Yemek', 
        image: 'https://cdn.pixabay.com/photo/2021/02/23/16/24/dumplings-6044141_1280.jpg',
        ingredients: ['3 su bardağı un', '1 adet yumurta', '1 çay kaşığı tuz', '1 su bardağı su', '500 gram kıyma', '2 adet soğan', 'Maydanoz', 'Yoğurt', 'Sarımsak', 'Tereyağı', 'Pul biber'],
        instructions: [
            '1. Un, yumurta, tuz ve su ile hamur yoğurun',
            '2. Hamuru 30 dakika dinlendirin',
            '3. Kıyma, rendelenmiş soğan ve baharatlarla iç harcı hazırlayın',
            '4. Hamuru açıp küçük kareler kesin',
            '5. Karelerin ortasına harç koyup kapatın',
            '6. Tuzlu suda mantıları haşlayın',
            '7. Süzüp sarımsaklı yoğurt ile servis yapın',
            '8. Üzerine kızdırılmış tereyağı ve pul biber gezdirin'
        ]
    }
];
