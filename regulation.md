> Submit的时候 校验规则

1.  基本上， 不同类型的Deal拥有不同的规则, 但是他们有一些共同的规则
    1.  Deal Name: 长度从1-50个字符 必须（这个必须似乎有点废话了，因为本来从逻辑上就是必须的）
    2.  Deal details => Sub-heading: 长度从2-50个字符 必须
    3.  Deal details => Business sector: 必选
    4.  Highligts: 长度从1-200个字符 必须大于或者等于三条

2.  有些规则是针对某一类Deal的
    1.  Ask: 对于Capitail Raising和Sell A Business为必须
    2.  Ask Description: 
        1.  对于Startup pitch为必须
        2.  对于Capitail Raising，Equity, Sell A Business为非必须
        3.  对于Partnerships因为不显示 所以不存在校验
    3.  Upload images: 图片的文件不能大于6M 必须大于3张图片
    4.  Upload logo: Logo的文件不能大于2M 必须
    5.  所有通用section（Executive Summary, Problem/Gap, Product/Service, Traction, Business model, Funding, Customers, Market, Competition）
        1.  他们全部是可选的
        2.  如果填写了Title，那么Body Text也必须写
        3.  Title的长度从1-50个字符
        4.  Body Text的长度从1-1000个字符
    6. Team
       1. Team member是可选的，但是如果一个member添加了image，那么这个member的name和role就是必须的
       2. Team member image: 图片的文件不能大于6M
    7. FAQ
       1. 对于有FAQ的Deal, FAQ是可选的，对于没有FAQ的Deal, 反正也看不见，所以不存在校验
       2. 如果填写了Question或者Answers，那么另外一个也必须填写
       3. Question的长度从1-200个字符
       4. Answers的长度从1-1000个字符
    
