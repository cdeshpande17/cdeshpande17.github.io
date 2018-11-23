 # helloworld/views.py
from django.shortcuts import render
from django.views.generic import TemplateView
from .forms import FeaturesForm
import csv
from .DataConverter import displayProjection


def is_blank(s):
    if s:
        return True
    return False

def predict_price(data):
    #query database of model results for the results on the given run
    bools = [bool(data['pop']), bool(data['price']), bool(data['avg_income'])]
    with open('map/static/test.csv') as file:
        reader = csv.reader(file)
        next(reader) #throw out header for now
        for row in reader:
            if bools == list(map(is_blank, row)):
                return row


# Create your views here.
class HomePageView(TemplateView):
    def get(self, request):
        form = FeaturesForm()
        return render(request, 'index.html', context={'form': form})
    def post(self, request):
        form = FeaturesForm(request.POST)
        if form.is_valid():
            return render(request, 'index.html', context={'form': form, 'results': results})
        else:
            return render(request, 'index.html', context={'form': form})

class StateView(TemplateView):
    def get(self, request):
        form = FeaturesForm()
        state = request.GET.get('state')
        return render(request, 'state.html', context={'form': form, 'state': state})
    def post(self, request):
        form = FeaturesForm(request.POST)
        state = request.GET.get('state')
        if form.is_valid():
            #Interact with model/data
            data = form.cleaned_data
            if state == "IA":
                if data["pop"]:
                    IAcounties = [displayProjection('map/static/USData/DallasCountyIA.csv','pop', 2018+int(data["years"])),
                                displayProjection('map/static/USData/PolkCountyIA.csv','pop', 2018+int(data["years"])),
                                displayProjection('map/static/USData/WarrenCountyIA.csv','pop', 2018+int(data["years"]))]
                elif data["avg_income"]:
                    IAcounties = [displayProjection('map/static/USData/DallasCountyIA.csv','income', 2018+int(data["years"])),
                                displayProjection('map/static/USData/PolkCountyIA.csv','income', 2018+int(data["years"])),
                                displayProjection('map/static/USData/WarrenCountyIA.csv','income', 2018+int(data["years"]))]
            elif state == "NY":
                if data["pop"]:
                    NYcounties = [displayProjection('map/static/USData/DallasCountyIA.csv','pop', 2018+int(data["years"])),
                                displayProjection('map/static/USData/PolkCountyIA.csv','pop', 2018+int(data["years"])),
                                displayProjection('map/static/USData/WarrenCountyIA.csv','pop', 2018+int(data["years"]))]
                elif data["avg_income"]:
                    NYcounties = [displayProjection('map/static/USData/DallasCountyIA.csv','income', 2018+int(data["years"])),
                                displayProjection('map/static/USData/PolkCountyIA.csv','income', 2018+int(data["years"])),
                                displayProjection('map/static/USData/WarrenCountyIA.csv','income', 2018+int(data["years"]))]
            #load maps, return both with context
            return render(request, 'state.html', context={'form': form, 'state': state, 'IAcounties': IAcounties})
        else:
            return render(request, 'state.html', context={'form': form, 'state': state})
7