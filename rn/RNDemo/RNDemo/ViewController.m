//
//  ViewController.m
//  RNDemo
//
//  Created by 赵祥 on 2018/6/26.
//  Copyright © 2018年 赵祥. All rights reserved.
//

#import "ViewController.h"
#import "RNViewController.h"

@interface ViewController ()

@property(strong,nonatomic)UIButton *btn;

@property(strong, nonatomic)UITextField *textFiled;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    CGPoint center = self.view.center;
    
    self.btn = [[UIButton alloc]initWithFrame:CGRectMake(50, center.y, 200, 50)];
    self.btn.backgroundColor = [UIColor redColor];
    [self.btn setTitle:@"查询天气" forState:UIControlStateNormal];
    [self.btn addTarget:self action:@selector(goView:) forControlEvents:UIControlEventTouchDown];
    [self.view addSubview:self.btn];
    
    self.textFiled = [[UITextField alloc]initWithFrame:CGRectMake(50, center.y - 100, 200, 50)];
    self.textFiled.backgroundColor = [UIColor grayColor];
    [self.view addSubview:self.textFiled];
}

- (void)goView:(UIButton *)btn
{
    RNViewController *RNView = [RNViewController new];
    
    NSDictionary *dic = @{@"cityName":self.textFiled.text};
    
    RNView.props = dic;
    
   // [self presentViewController:RNView animated:YES completion:nil];
    [self.navigationController pushViewController:RNView animated:YES];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
