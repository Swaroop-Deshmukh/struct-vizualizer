import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Mail, Lock, User, Phone, ArrowRight, Leaf, ArrowLeft, Shield, FileText, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type AuthMode = "select" | "passenger" | "driver";
type DriverStep = "account" | "vehicle" | "documents";

export default function Auth() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>("select");
  const [isLoading, setIsLoading] = useState(false);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Passenger signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Driver signup state
  const [driverStep, setDriverStep] = useState<DriverStep>("account");
  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverPassword, setDriverPassword] = useState("");
  
  // Vehicle details
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleType, setVehicleType] = useState<"hatchback" | "sedan" | "suv">("sedan");

  const handleLogin = async (e: React.FormEvent, role: "passenger" | "driver") => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${role}.`,
      });
      navigate(role === "driver" ? "/driver" : "/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePassengerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: signupName,
            phone: signupPhone,
            role: "passenger",
          },
        },
      });

      if (error) throw error;

      // Add passenger role
      if (data.user) {
        await supabase.from("user_roles").insert({
          user_id: data.user.id,
          role: "passenger",
        });
      }

      toast({
        title: "Account created!",
        description: "Welcome to Sharka. Start sharing rides and saving money!",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Please try again with different credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDriverSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: driverEmail,
        password: driverPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/driver`,
          data: {
            full_name: driverName,
            phone: driverPhone,
            role: "driver",
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Add driver role
        await supabase.from("user_roles").insert({
          user_id: data.user.id,
          role: "driver",
        });

        // Add vehicle
        await supabase.from("vehicles").insert({
          driver_id: data.user.id,
          make: vehicleMake,
          model: vehicleModel,
          year: parseInt(vehicleYear),
          color: vehicleColor,
          license_plate: vehiclePlate,
          vehicle_type: vehicleType,
          is_active: true,
        });
      }

      toast({
        title: "Driver account created!",
        description: "Welcome to Sharka. Start earning by sharing rides!",
      });
      navigate("/driver");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderModeSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Car className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold font-display text-foreground">Sharka</h1>
        <p className="text-muted-foreground mt-2 text-lg">Share • Save • Sustain</p>
      </div>

      <div className="space-y-4">
        <Button
          onClick={() => setAuthMode("passenger")}
          className="w-full h-20 text-lg gradient-primary hover:opacity-90 shadow-glow"
          size="lg"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Continue as Passenger</div>
              <div className="text-sm opacity-80">Book rides & share to save</div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 ml-auto" />
        </Button>

        <Button
          onClick={() => setAuthMode("driver")}
          variant="outline"
          className="w-full h-20 text-lg border-2 border-accent hover:bg-accent/10 hover:border-accent"
          size="lg"
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Car className="h-6 w-6 text-accent" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground">Become a Driver Partner</div>
              <div className="text-sm text-muted-foreground">Earn more with shared rides</div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 ml-auto text-accent" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center pt-4">
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="h-10 w-10 rounded-lg bg-sharing/10 flex items-center justify-center mx-auto mb-2">
            <Car className="h-5 w-5 text-sharing" />
          </div>
          <p className="text-sm font-medium">Share Rides</p>
          <p className="text-xs text-muted-foreground">Save together</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-2">
            <span className="text-lg font-bold text-accent">₹</span>
          </div>
          <p className="text-sm font-medium">Save 40%</p>
          <p className="text-xs text-muted-foreground">On every ride</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="h-10 w-10 rounded-lg bg-eco/10 flex items-center justify-center mx-auto mb-2">
            <Leaf className="h-5 w-5 text-eco" />
          </div>
          <p className="text-sm font-medium">Go Green</p>
          <p className="text-xs text-muted-foreground">Save CO₂</p>
        </div>
      </div>
    </div>
  );

  const renderPassengerAuth = () => (
    <div className="space-y-6">
      <button
        onClick={() => setAuthMode("select")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold font-display">Passenger</h2>
        <p className="text-muted-foreground">Book rides & save with sharing</p>
      </div>

      <Card className="border-0 shadow-card">
        <CardContent className="p-6">
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={(e) => handleLogin(e, "passenger")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passenger-login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="passenger-login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passenger-login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="passenger-login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-primary hover:opacity-90" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handlePassengerSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passenger-signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="passenger-signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passenger-signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="passenger-signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passenger-signup-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="passenger-signup-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passenger-signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="passenger-signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-primary hover:opacity-90" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  const renderDriverAuth = () => (
    <div className="space-y-6">
      <button
        onClick={() => {
          if (driverStep !== "account") {
            setDriverStep(driverStep === "documents" ? "vehicle" : "account");
          } else {
            setAuthMode("select");
          }
        }}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="text-center">
        <div className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
          <Car className="h-8 w-8 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold font-display">Driver Partner</h2>
        <p className="text-muted-foreground">Earn more with shared rides</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        {["account", "vehicle", "documents"].map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                driverStep === step
                  ? "bg-accent text-accent-foreground"
                  : index < ["account", "vehicle", "documents"].indexOf(driverStep)
                  ? "bg-eco text-eco-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            {index < 2 && (
              <div
                className={`w-8 h-0.5 ${
                  index < ["account", "vehicle", "documents"].indexOf(driverStep)
                    ? "bg-eco"
                    : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="border-0 shadow-card">
        <CardContent className="p-6">
          {driverStep === "account" && (
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={(e) => handleLogin(e, "driver")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="driver-login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="driver-login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driver-login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="driver-login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login as Driver"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="driver-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="driver-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driver-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="driver-email"
                        type="email"
                        placeholder="Enter your email"
                        value={driverEmail}
                        onChange={(e) => setDriverEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driver-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="driver-phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={driverPhone}
                        onChange={(e) => setDriverPhone(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driver-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="driver-password"
                        type="password"
                        placeholder="Create a password"
                        value={driverPassword}
                        onChange={(e) => setDriverPassword(e.target.value)}
                        className="pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={() => setDriverStep("vehicle")}
                    className="w-full bg-accent hover:bg-accent/90" 
                    size="lg"
                    disabled={!driverName || !driverEmail || !driverPhone || !driverPassword}
                  >
                    Continue to Vehicle Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {driverStep === "vehicle" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Car className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Vehicle Details</h3>
                  <p className="text-sm text-muted-foreground">Tell us about your vehicle</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-make">Make</Label>
                  <Input
                    id="vehicle-make"
                    placeholder="e.g., Maruti"
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-model">Model</Label>
                  <Input
                    id="vehicle-model"
                    placeholder="e.g., Swift"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-year">Year</Label>
                  <Input
                    id="vehicle-year"
                    type="number"
                    placeholder="e.g., 2020"
                    value={vehicleYear}
                    onChange={(e) => setVehicleYear(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle-color">Color</Label>
                  <Input
                    id="vehicle-color"
                    placeholder="e.g., White"
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle-plate">License Plate</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="vehicle-plate"
                    placeholder="e.g., MH 01 AB 1234"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Vehicle Type</Label>
                <div className="grid grid-cols-3 gap-3">
                  {(["hatchback", "sedan", "suv"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setVehicleType(type)}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        vehicleType === type
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <Car className={`h-6 w-6 mx-auto mb-1 ${vehicleType === type ? "text-accent" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium capitalize">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => setDriverStep("documents")}
                className="w-full bg-accent hover:bg-accent/90" 
                size="lg"
                disabled={!vehicleMake || !vehicleModel || !vehicleYear || !vehicleColor || !vehiclePlate}
              >
                Continue to Documents
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {driverStep === "documents" && (
            <form onSubmit={handleDriverSignup} className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Documents & Verification</h3>
                  <p className="text-sm text-muted-foreground">Almost done! Review and submit</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-eco" />
                    <div>
                      <p className="font-medium">Driving License</p>
                      <p className="text-sm text-muted-foreground">Will be verified later</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-eco" />
                    <div>
                      <p className="font-medium">Vehicle RC</p>
                      <p className="text-sm text-muted-foreground">Will be verified later</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-eco" />
                    <div>
                      <p className="font-medium">Insurance</p>
                      <p className="text-sm text-muted-foreground">Will be verified later</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-eco/10 border border-eco/20">
                <p className="text-sm text-eco-foreground">
                  <strong>Note:</strong> You can start driving after document verification. 
                  This usually takes 24-48 hours.
                </p>
              </div>

              <Button 
                type="submit"
                className="w-full bg-accent hover:bg-accent/90" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Complete Registration"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-md">
        {authMode === "select" && renderModeSelection()}
        {authMode === "passenger" && renderPassengerAuth()}
        {authMode === "driver" && renderDriverAuth()}
      </div>
    </div>
  );
}
