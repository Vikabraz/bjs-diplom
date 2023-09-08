
// курс валют
const ratesBoard = new RatesBoard();

const repeatGetStoks = () => {
ApiConnector.getStocks((response) => {
    if(response.success){
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
});
}

repeatGetStoks();
setInterval(repeatGetStoks, 60000);



// выход

const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
    ApiConnector.logout((response) => {
        if(response.success){
            location.reload();
        }
    });
}

ApiConnector.current((response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
  });

const favorit = new FavoritesWidget();
// избранные
ApiConnector.getFavorites((response) => {
    if(response.success){
        favorit.clearTable();
        favorit.fillTable(response.data);    
        moneyM.updateUsersList(response.data);
    }
} );
// добавляем
favorit.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) =>{
        if (response.success){
            favorit.clearTable();
            favorit.fillTable(response.data); 
            moneyM.updateUsersList(response.data);
            favorit.setMessage(response.success, 'Пользователь добавлен' );
    } else{
        favorit.setMessage(response.success, response.error);

    }
});
}
// удаляем
favorit.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) =>{
        if (response.success){
            favorit.clearTable();
            favorit.fillTable(response.data); 
            moneyM.updateUsersList(response.data);
            favorit.setMessage(response.success, 'Пользователь удален');
    }else{
        favorit.setMessage(response.success, response.error);

    }
});
}


 


const moneyM = new MoneyManager();
//пополнение
moneyM.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            moneyM.setMessage(response.success, 'Счет пополнен');
        } else{
            moneyM.setMessage(response.success, response.error);
        }
    });   
}

// конвертация
moneyM.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            moneyM.setMessage(response.success, 'Конвертация  выполнена');
        } else{
            moneyM.setMessage(response.success, response.error);
        }
    });
}

// отправка
moneyM.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            moneyM.setMessage(response.success, 'Перевод выполнен' )
    } else{
        moneyM.setMessage(response.success, response.error);
    }
});
}




