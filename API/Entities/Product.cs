namespace API.Entities;

public class Product
{
    public int Id { get; set; }
    public required String Name { get; set;}

    public required String Description { get; set;}

    public required long Price { get; set;}

    public required String PictureUrl {get; set; }

    public required String Type { get; set; }

    public required String Brand { get; set; }

    public int QuantityInStock { get; set; }

}
