//
//  RNViewController.m
//  RNDemo
//
//  Created by 赵祥 on 2018/6/26.
//  Copyright © 2018年 赵祥. All rights reserved.
//

#import "RNViewController.h"
#import <React/RCTRootView.h>
#import "ViewController.h"
#import "AppDelegate.h"

@interface RNViewController () <RCTBridgeModule>

@end

@implementation RNViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    NSString * strUrl = @"http://localhost:8081/index.ios.bundle?platform=ios&dev=true";
    NSURL * jsCodeLocation = [NSURL URLWithString:strUrl];
    
    RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                         moduleName:@"RNDemo"
                                                  initialProperties:self.props
                                                      launchOptions:nil];
    self.view = rootView;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

RCT_EXPORT_METHOD(rnInvoke:(NSString *)msg) {
   
    dispatch_async(dispatch_get_main_queue(), ^{
        ViewController *VC = [[ViewController alloc]init];
        AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
        
        
    });
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
