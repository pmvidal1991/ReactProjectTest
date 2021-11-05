using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace streamProject.models
{
    public class WineModel
    {
        public string id { get; set; }
        public string name { get; set; }
        public string reference { get; set; }
        public string section { get; set; }
        public string division { get; set; }
        public string type { get; set; }
        public string description { get; set; }
        public string region { get; set; }
        public string brand { get; set; }
        public string img { get; set; }

        public WineModel()
        {

        }
        public static List<WineModel> GetList(string con, FiltersModel filters)
        {

            var query = " where ";
            var filterList = new Dictionary<string, string>();
            if (filters != null)
            {
                if (string.IsNullOrEmpty(filters.brand) == false)
                {
                    filterList.Add("brand", filters.brand);
                }
                if (string.IsNullOrEmpty(filters.division) == false)
                {
                    filterList.Add("division", filters.division);
                }
                if (string.IsNullOrEmpty(filters.region) == false)
                {
                    filterList.Add("region", filters.region);
                }
                if (string.IsNullOrEmpty(filters.section) == false)
                {
                    filterList.Add("section", filters.section);
                }
                if (string.IsNullOrEmpty(filters.type) == false)
                {
                    filterList.Add("type", filters.type);
                }
            }
            SqlClass sqlObject = new SqlClass(con);
            List<WineModel> myList = new List<WineModel>();
            sqlObject.opencon();//Abre Conexão
            if (filterList.Count == 0)
            {
                SqlCommand command = new SqlCommand("SELECT * FROM Wine", sqlObject.getCon());//Query a ser executada.
                SqlDataReader reader2 = command.ExecuteReader();//Executa a query.
                while (reader2.Read())// Caso exista dados , ele seta o objeto do tipo "Users" com os dados que vêm do base de dados
                {
                    WineModel tmp = new WineModel();
                    tmp.id = reader2["id"].ToString();
                    tmp.name = reader2["name"].ToString();
                    tmp.reference = reader2["ref"].ToString();
                    tmp.section = reader2["section"].ToString();
                    tmp.division = reader2["division"].ToString();
                    tmp.type = reader2["type"].ToString();
                    tmp.description = reader2["description"].ToString();
                    tmp.region = reader2["region"].ToString();
                    tmp.brand = reader2["brand"].ToString();
                    tmp.img = reader2["img"].ToString();
                    myList.Add(tmp);

                }
                sqlObject.closcon();//Fecha Conexão
                return myList;
            }
            else
            {


                for (int i = 0; i < filterList.Count; i++)
                {
                    if (i == filterList.Count - 1)
                    {
                        query = query + filterList.Keys.ElementAt(i) + " = '" + filterList.Values.ElementAt(i) + "'";
                    }
                    else
                    {
                        query = query + filterList.Keys.ElementAt(i) + " = '" + filterList.Values.ElementAt(i) + "' AND ";
                    }

                }

                SqlCommand command = new SqlCommand("SELECT * FROM Wine" + query, sqlObject.getCon());//Query a ser executada.
                SqlDataReader reader2 = command.ExecuteReader();//Executa a query.
                while (reader2.Read())// Caso exista dados , ele seta o objeto do tipo "Users" com os dados que vêm do base de dados
                {
                    WineModel tmp = new WineModel();
                    tmp.id = reader2["id"].ToString();
                    tmp.name = reader2["name"].ToString();
                    tmp.reference = reader2["ref"].ToString();
                    tmp.section = reader2["section"].ToString();
                    tmp.division = reader2["division"].ToString();
                    tmp.type = reader2["type"].ToString();
                    tmp.description = reader2["description"].ToString();
                    tmp.region = reader2["region"].ToString();
                    tmp.brand = reader2["brand"].ToString();
                    tmp.img = reader2["img"].ToString();
                    myList.Add(tmp);

                }
                sqlObject.closcon();//Fecha Conexão
                return myList;

            }
        }
        public static ModelResponse AddWine(WineModel item, string con)
        {

            SqlClass sqlObject = new SqlClass(con);
            sqlObject.opencon();//Abre Conexão
            SqlCommand command = new SqlCommand("INSERT INTO Wine (name,ref,section,division,type,description,region,brand,img) VALUES ('" + item.name + "','" + item.reference + "','" + item.section + "','" + item.division + "','" + item.type + "','" + item.description + "','" + item.region + "','" + item.brand + "','" + item.img + "')", sqlObject.getCon());
            SqlDataReader reader = command.ExecuteReader();
            sqlObject.closcon();//Fecha Conexão
            return new ModelResponse(true, "Wine added with success!");

        }
        public static WineModel GetWineById(string con, int id)
        {

            SqlClass sqlObject = new SqlClass(con);
            sqlObject.opencon();//Abre Conexão
            SqlCommand command = new SqlCommand("SELECT * FROM Wine where id = '" + id + "'", sqlObject.getCon());//Query a ser executada.
            SqlDataReader reader2 = command.ExecuteReader();//Executa a query.
            WineModel tmp = new WineModel();
            while (reader2.Read())// Caso exista dados , ele seta o objeto do tipo "Users" com os dados que vêm do base de dados
            {

                tmp.id = reader2["id"].ToString();
                tmp.name = reader2["name"].ToString();
                tmp.reference = reader2["ref"].ToString();
                tmp.section = reader2["section"].ToString();
                tmp.division = reader2["division"].ToString();
                tmp.type = reader2["type"].ToString();
                tmp.description = reader2["description"].ToString();
                tmp.region = reader2["region"].ToString();
                tmp.brand = reader2["brand"].ToString();
                tmp.img = reader2["img"].ToString();


            }
            sqlObject.closcon();//Fecha Conexão
            return tmp;


        }
    }
}
