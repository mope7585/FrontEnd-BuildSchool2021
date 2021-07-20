using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JavaScriptArray_Lab
{
    class Program
    {
        static void Main(string[] args)
        {
            var list = new List<ItemObj>()
            {
                new ItemObj(){Item = "啤酒",Type = "喝的" },
                new ItemObj() { Item = "汽水", Type = "喝的" },
                new ItemObj() { Item = "火鍋", Type = "吃的" },
                new ItemObj() { Item = "燒烤", Type = "吃的" },
                new ItemObj() { Item = "冰淇淋", Type = "吃的" }
            };
            //找第一個"吃的"東西
            var r1 = list.First(x => x.Type == "吃的");
            Console.WriteLine(r1.Item);

            var r1_1 = list.Find(x => x.Type == "吃的");
            Console.WriteLine(r1_1.Item);

            var r1_2 = list.Where(x => x.Type == "吃的").First();
            Console.WriteLine(r1_2.Item);

            //找所有"吃的"東西
            var r2 = list.Where(x => x.Type == "吃的");
            Console.WriteLine(string.Join(",", r2.Select(x => x.Item)));

            //找"冰淇淋"在第幾個位置
            var ice = list.Find(x => x.Item == "冰淇淋");
            var r3 = list.IndexOf(ice);
            Console.WriteLine($"冰淇淋在第{r3 + 1}個位置");
            var r3_1 = list.FindIndex(x => x.Item == "冰淇淋");
            Console.WriteLine($"冰淇淋在第{r3_1 + 1}個位置");

            //用list產生新的集合
            //['啤酒','汽水','火鍋'....]
            var r4 = list.Select(x => x.Item);
            
            Console.WriteLine(string.Join(",",r4));

            //用List產生新的集合
            var r5 = list.Select((x, index) => new { Id = list.Count - index, Name = x.Item });
            Console.WriteLine(string.Join(Environment.NewLine , r5.Select(x => $"Id:{x.Id},Name:{x.Name}")));

            //排序
            var nums_1 = new int[] { 9, 6, 4, 2, 1 };
            var r6 = nums_1.OrderBy(x => x);
            Console.WriteLine(string.Join(",", r6));

            //排序lv2
            var nums_2 = new int[] { 10000, 10, 100, 1, 101 };
            var r7 = nums_2.OrderBy(x => x);
            Console.WriteLine(r7);
            

            //自訂排序
            var zoo = new List<string> { "龍", "鼠", "馬", "豬" };
            var zooSort = zoo.OrderBy(x => x, new ZodicCompare());
            Console.WriteLine(string.Join(",",zooSort));

            Console.ReadLine();

        }



    }

    class ItemObj 
    {
        public string Item { get; set; }
        
        public string Type { get; set; }
    }

    public class ZodicCompare : IComparer<string>
    {
        private static List<string> zodic = new List<string>{"鼠","牛","虎","兔","龍","蛇","馬","羊","猴","雞","狗","豬"};

        public int Compare(string x, string y)
        {
            return zodic.IndexOf(x) - zodic.IndexOf(y);
        }
    }
}
