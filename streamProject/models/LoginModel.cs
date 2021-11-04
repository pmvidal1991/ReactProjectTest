using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace streamProject.models
{
    public class LoginModel
    {
        public int id;
        public string? Nome;
        public string? Email;
        public string? Username;
        public string? Password;
        public bool? isAdmin;
        public bool? success;

        public LoginModel()
        {

        }

        public static LoginModel Login(LoginModel user, string con)
        {
            SqlClass sqlObject = new SqlClass(con);
            sqlObject.opencon();//Abre Conexão
            SqlCommand command = new SqlCommand("SELECT * FROM Users where username='" + user.Username + "' AND password='" + user.Password + "'", sqlObject.getCon());//Query a ser executada.
            SqlDataReader reader2 = command.ExecuteReader();//Executa a query.
            LoginModel user2 = new LoginModel();
            while (reader2.Read())// Caso exista dados , ele seta o objeto do tipo "Users" com os dados que vêm do base de dados
            {
                user2.Username = reader2["username"].ToString();
                user2.Password = reader2["password"].ToString();

            }
            sqlObject.closcon();//Fecha Conexão
            if (string.IsNullOrEmpty(user2.Username) == false && string.IsNullOrEmpty(user2.Password) == false && user2.Username == user.Username && user2.Password == user.Password)//Verfica se os dados são coerentes.
            {
                user2.success = true;//Retorna true e o id do utilizador, Caso os dados sejam querentes.
                user2.Password = null;
                return user2;
            }
            else
            {
                user2.success = false;//Retorna false Caso os dados não sejam querentes.
                user2.Password = null;
                return user2;
            }
        }
    }
}
