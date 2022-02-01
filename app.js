"use strict";

document.addEventListener('DOMContentLoaded', ()  => {
    const form = document.querySelector('#form'),
          name = form.querySelector('#formName'),
          surName = form.querySelector('#formSurname'),
          email = form.querySelector('#formEmail'),
          password = form.querySelector('#formPass'),
          passConf = form.querySelector('#formPass-conf'),
          dateBirth = form.querySelector('#formDB'),
          request = form.querySelectorAll('.req'),
          checkbox = form.querySelector('.checkbox__input'),
          btn = form.querySelector('.form__btn');

    const NameReg = /^[A-Za-zА-Яа-я]{2,30}$|(^$)/,
          MailReg =  /[A-Za-z0-9-_]{1,}@[A-Za-z0-9-_]{1,}\.[a-z]{2,4}|(^$)/,
          PassReg = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,16}|(^$)/;



// Фун-ия ошибки
          const generateError = function (text) {
            const error = document.createElement('div');
            error.className = 'error';
            error.style.color = '#9d0332';
            error.style.marginBottom = '10px';
            error.innerHTML = text;
            return error;
          };

// Удаляем сообщение об ошибке чтобы не двоилось
          const removeVal = function () {
            const errors = form.querySelectorAll('.error');
            for (let i = 0; i < errors.length; i++) {
                errors[i].remove();
            }
          };

// Проверям все поля на пустую строку
          const checkFields = function () {
            for (let i = 0; i < request.length; i++) {
                if (!request[i].value) {
                    const error = generateError('Заполните поле');
                    form[i].parentElement.insertBefore(error, request[i]);
                    setTimeout(() => {
                      error.remove();
                    },4000);
                }
            }
          };

// Проверям пароли на совпадение
          const checkPassConfirm = function () {
            if (password.value !== passConf.value) {
                const error = generateError('Пароли не совпадают');
                password.parentElement.insertBefore(error, password);
                setTimeout(() => {
                  error.remove();
                },4000);
            }

          };

// Проверка имени и фамилии
          const checkName = function () {
              if (!validate(NameReg, name.value)) {
                const error = generateError('Некорректное имя');
                name.parentElement.insertBefore(error, name);
                setTimeout(() => {
                  error.remove();
                },4000);
              }
              function validate(reg, inp) {
                return reg.test(inp);
              }
            };

          const checkSurname = function () {
              if (!validate(NameReg, surName.value)) {
                const error = generateError('Некорректная фамилия');
                surName.parentElement.insertBefore(error, surName);
                setTimeout(() => {
                  error.remove();
                },4000);
              }
              function validate(reg, inp) {
                return reg.test(inp);
              }
            };

// Проверка Email
          const checkEmailValid = function () {
            if (!validate(MailReg, email.value)) {
              const error = generateError('Некорректный адрес электронной почты');
              email.parentElement.insertBefore(error, email);
              setTimeout(() => {
                error.remove();
              },4000);
            }
            function validate(reg, inp) {
              return reg.test(inp);
            }
          };

//Проверка пароля
          const checkPassValid = function () {
            if (!validate(PassReg, password.value)) {
              const error = generateError('Минимальная длина пароля 8 символов. Пароль должен содержать 0-9,Az,!@#$');
              password.parentElement.insertBefore(error, password);
              setTimeout(() => {
                error.remove();
              },4000);
            }
            function validate(reg, inp) {
              return reg.test(inp);
            }
          };

// Проверка возраста
          const checkDB = function () {
            let now = new Date();
            let thisYear = now.getFullYear();

            let birthDay = new Date(dateBirth.value);
            let birthDayYear = birthDay.getFullYear();
            let birthDayMonth = birthDay.getMonth();
            let birthDayDays = birthDay.getDate();
            let currentDate = new Date(birthDayYear + 18, birthDayMonth, birthDayDays);

            if (now >= currentDate) {
              const error = generateError('');
              dateBirth.parentElement.insertBefore(error, dateBirth);
            } else {
              const error = generateError('Отправка данных только для лиц старше 18 лет');
              dateBirth.parentElement.insertBefore(error, dateBirth);
            }

          };

// Проверка checkbox
          const checkBoxAgree = function () {
            if (checkbox.getAttribute("type") === "checkbox" && checkbox.checked === false){
              const error = generateError('Подтвердите соглашение о условиях');
              checkbox.parentElement.insertBefore(error, checkbox);
            }
          };



    form.addEventListener('submit', (e) => {
        e.preventDefault();

        removeVal();

        checkFields();

        checkPassConfirm();

        checkName();
        checkSurname();

        checkEmailValid();
        checkPassValid();

        checkDB();
        checkBoxAgree();

    });
});



