const searchOpen = (() => {
  let searchbtn = document.querySelector("#searchbtn");
  if (searchbtn) {
    searchbtn.addEventListener("click", () => {
      console.log("почти работает");
      let search = document.querySelector("#header-input");
      if (search) {
        console.log("Ура, работает");
        search.classList.toggle("active");
      } else {
        console.log("Опять Ой");
      }
    });
  } else {
    console.log("Ой");
  }
})();

const burgerOpen = (() => {
  let burger = document.querySelector("#burger");
  if (burger) {
    burger.addEventListener("click", () => {
      console.log("почти работает");
      let burgerMenu = document.querySelector("#header-list");
      burgerMenu.classList.toggle("active");
      console.log("Ура, работает");
    });
  }
})();

// Добавление в избранное
const addFavorite = (() => {
  // Находим массив всех кнопок добавления в избранное
  let btnArray = document.querySelectorAll("[data-add-favorite]");
  // Находим по айди элемент в шапке сайта, в который мы будем записывать количество добавленных товаров в избранное
  let countHeader = document.querySelector("#fav-num");

  // Проходим в цикле по всем кнопкам и отслеживаем событие нажатия по кнопке
  btnArray.forEach((el) => {
    el.addEventListener("click", () => {
      // добавляем или удаляем класс active для кнопки, по который был клик
      el.classList.toggle("active");

      // Получаем число, которое на данный момент записано в шапке сайта. Проверяем, если кнопка имеет класс active
      // т.е. мы добавляем в избранное, то увеличиваем число на единицу. Если убираем из избранного, то уменьшаем на единицу.
      // После этого записываем новое число в контейнер в шапке сайта
      let count = parseInt(countHeader.textContent);
      if (el.classList.contains("active")) {
        count = count + 1;
      } else {
        count = count - 1;
      }
      countHeader.textContent = count;

      // Записываем это же число в локал сторадж
      localStorage.setItem("headerFavorite", count);

      // Проверяем, если у нас количество добавленых товаров в избранное равно нулю, то убираем клсаа active у контейнера в шапке
      if (count === 0) {
        countHeader.classList.remove("active");
      } else {
        countHeader.classList.add("active");
      }
    });
  });
})();

// Добавление в корзину
const addCart = () => {
  // Находим массив всех кнопок добавления в корзину
  let btnArray = document.querySelectorAll("[data-plus]");
  // Находим по айди элемент в шапке сайта, в который мы будем записывать количество добавленных товаров в корзину
  let countHeaderCart = document.querySelector("#cart-num");
  // Проходим в цикле по всем кнопкам и отслеживаем событие нажатия по кнопке
  btnArray.forEach((el) => {
    el.addEventListener("click", () => {
      // Получаем число, которое на данный момент записано в шапке сайта. Увеличиваем число на единицу
      // После этого записываем новое число в контейнер в шапке сайта и добавляем для контейнера класс active
      let count = parseInt(countHeaderCart.textContent);
      count = count + 1;
      countHeaderCart.textContent = count;

      // Записываем это же число в локал сторадж
      localStorage.setItem("headerCart", count);

      // ПЕРЕДЕЛАТЬ В СООТВЕТСТВИИ С CHANGE.JS добавление и удаление из storage
      const addStorage = (() => {
        add(product, price);
        let storage = localStorage.getItem("product");
        let objectToFunction = {
          id: el.getAttribute("data-id"),
          count: 1,
          price: el.getAttribute("data-price"),
          desc: el.getAttribute("data-desc"),
          name: el.getAttribute("data-name"),
          img: el.getAttribute("data-img"),
        };
        if (storage) {
          objectToFunction = JSON.parse(storage);
          let result = objectToFunction;
          if (result === -1) {
            objectToFunction.push({
              id: product,
              count: "1",
              price: price,
              desc: desc,
              img: img,
            });
          } else {
            objectToFunction[result].count = String(
              parseInt(objectToFunction[result].count) + 1
            );
          }
        } else {
          objectToFunction = [{ id: product, count: "1", price: price }];
        }
        localStorage.setItem("product", JSON.stringify(objectToFunction));
      })();

      // dataId = el.getAttribute("data-id");
      // let objectToFunction = {
      //   id: el.getAttribute("data-minus"),
      //   count: 1,
      //   price: el.getAttribute("data-price"),
      // };
      // addStorage(objectToFunction);

      // let countObject = [];
      // let storage = localStorage.getItem("product");
      // if (storage) {
      //   let product = JSON.parse(storage);
      //   product.push(dataId);
      //   countObject = product;
      // } else {
      //   countObject = [dataId];
      // }
      // localStorage.setItem("product", JSON.stringify(countObject));

      // КОНЕЦ

      countHeaderCart.classList.add("active");
      // Находим родительский элемент кнопки, а именно картчоку товара. Находим в этой карточке контейнер, в который записывается
      // количество добавленного товара
      let parent = el.closest("[data-product-card]");
      let cartCount = parent.querySelector("[data-cart-count]");

      // Получаем текущее количество добавленного товара, увеличиваем на единицу и записываем новое число в контейнер
      let countNearButton = parseInt(cartCount.textContent);
      countNearButton = countNearButton + 1;
      cartCount.textContent = countNearButton;
    });
  });

  // Удаление из корзины
  const removeCart = (() => {
    // Находим массив всех кнопок удаления в корзину
    let btnArray = document.querySelectorAll("[data-minus]");
    // Находим по айди элемент в шапке сайта, в который мы будем записывать количество товаров в корзине после удаления
    let countHeaderCart = document.querySelector("#cart-num");

    // Проходим в цикле по всем кнопкам и отслеживаем событие нажатия по кнопке
    btnArray.forEach((el) => {
      el.addEventListener("click", () => {
        // Получаем число, которое на данный момент записано в шапке сайта. Уменьшаем число на единицу
        // После этого записываем новое число в контейнер в шапке сайта.
        // Проверяем не равно ли число нулю или меньше нуля. Если ноль или меньше, то убираем класс active. И наоброт.
        let count = parseInt(countHeaderCart.textContent);

        // Находим родительский элемент кнопки, а именно карточку товара. Находим в этой карточке контейнер, в который записывается
        // количество добавленного товара
        let parent = el.closest("[data-product-card]");
        let cartCount = parent.querySelector("[data-cart-count]");

        // Получаем текущее количество добавленного товара. Если количество более нуля, то уменьшаем на единицу и записываем в контейнер
        // Если равно нулю, то записываем обратно ноль
        let countNearButton = parseInt(cartCount.textContent);
        if (countNearButton > 0) {
          countNearButton = countNearButton - 1;
          count = count - 1;
        }
        cartCount.textContent = countNearButton;
        countHeaderCart.textContent = count;

        if (count === 0) {
          countHeaderCart.classList.remove("active");
        } else {
          countHeaderCart.classList.add("active");
        }

        // ПЕРЕДЕЛАТЬ В СООТВЕТСТВИИ С CHANGE.JS добавление и удаление из storage
        const removeStorage = (() => {
          remove(product);
          let storage = localStorage.getItem("product");
          let objectToFunction = {
            id: el.getAttribute("data-id"),
            count: 1,
            price: el.getAttribute("data-price"),
            desc: el.getAttribute("data-desc"),
            name: el.getAttribute("data-name"),
            img: el.getAttribute("data-img"),
          };
          if (storage) {
            objectToFunction = JSON.parse(storage);
            let result = objectToFunction.findIndex((obj) => obj.id == product);
            if (result === -1) {
              return false;
            } else {
              if (objectToFunction[result].count > 1) {
                objectToFunction[result].count = String(
                  parseInt(objectToFunction[result].count) - 1
                );
              } else {
                objectToFunction = objectToFunction.filter(
                  (el) => el.id != product
                );
              }
            }
          } else {
            return false;
          }
          localStorage.setItem("product", JSON.stringify(objectToFunction));
        })();
        const clearStorage = (() => {
          clear();
          let storage = localStorage.getItem("product");
          if (storage) {
            localStorage.removeItem("product");
          } else {
            return false;
          }
        })();

        // dataId = el.getAttribute("data-minus");

        // let countObject = [];
        // let storage = localStorage.getItem("product");
        // if (storage) {
        //   let product = JSON.parse(storage);
        //   product.forEach((e) => {
        //     if (e === dataId) {
        //     }
        //   });
        //   countObject = product;
        //   localStorage.setItem("product", JSON.stringify(countObject));
        // }

        // КОНЕЦ
      });
    });
  })();

  // Вывод данных из локал сторадж в шапке сайта
  const getStorage = (() => {
    // Получаем количество товаров в избранном из локал сторадж
    let countFavorite = parseInt(localStorage.getItem("headerFavorite"));
    // Находим по айди элемент в шапке сайта, в который мы будем записывать количество добавленных товаров в избранное
    let countHeader = document.querySelector("#fav-num");

    // Получаем количество товаров в корзине из локал сторадж
    let countCart = parseInt(localStorage.getItem("headerCart"));
    // Находим по айди элемент в шапке сайта, в который мы будем записывать количество добавленных товаров в корзину
    let countHeaderCart = document.querySelector("#cart-num");

    // Получаем название товара из локал сторадж
    let productCard = localStorage.getItem("product");
    // Находим карточки товаров
    let productCardGet = document.querySelectorAll("[data-id]");
    // Если в локал сторадж количество товаров в избранном больше нуля, то добавляем для контейнера в шапке класс active и записываем туда
    // количество товаров из локал сторадж

    if (countFavorite > 0) {
      countHeader.classList.add("active");
      countHeader.textContent = countFavorite;
    }
    // Если в локал сторадж количество товаров в корзине больше нуля, то добавляем для контейнера в шапке класс active и записываем туда
    // количество товаров из локал сторадж
    if (countCart > 0) {
      countHeaderCart.classList.add("active");
      countHeaderCart.textContent = countCart;
    }

    productCardGet.forEach((el) => {
      if (productCard) {
        let productStorage = JSON.parse(productCard);
        productStorage.forEach((e) => {
          if (e === el.getAttribute("data-id")) {
            let parent = el.closest("[data-product-card]");
            let cartCount = parent.querySelector("[data-cart-count]");
            let countText = parseInt(cartCount.textContent);
            countText = countText + 1;
            cartCount.textContent = countText;
          }
        });
      }
    });
  })();
};

function alerted() {
  alert("Ok");
}
