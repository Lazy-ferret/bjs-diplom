'use strict';

// logout

const logoutBtn = new LogoutButton();

logoutBtn.action = () => ApiConnector.logout((logoutClick) => {
    if (logoutClick) {
        location.reload();
    }
});

// user profile

const showCurrentUser = () => ApiConnector.current((response) => {
    if (response) {
        ProfileWidget.showProfile(response.data);
    }
});
showCurrentUser();

// exchange rate board

const rateBoard = new RatesBoard();
const getExchangeRates = () => ApiConnector.getStocks((response) => {
    if (response) {
        rateBoard.clearTable();
        rateBoard.fillTable(response.data);
    }
});
getExchangeRates();
setInterval(getExchangeRates, 1000 * 60);


//add money to current user

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Счет успешно пополнен");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
});

//money conversion

moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Конвертация успешно выполнена");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
});

//transfer money from current user

moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Перевод средств успешно выполнен");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
});

// get favories list

const favoritesTableBody = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response) {
        favoritesTableBody.clearTable();
        favoritesTableBody.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

// add user to favorites list

favoritesTableBody.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
        favoritesTableBody.clearTable();
        favoritesTableBody.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        moneyManager.setMessage(response.success, "Пользователь добавлен в избранное");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
});

// remove user from favorites list
favoritesTableBody.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
        favoritesTableBody.clearTable();
        favoritesTableBody.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        moneyManager.setMessage(response.success, "Пользователь удален из избранного");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
});











