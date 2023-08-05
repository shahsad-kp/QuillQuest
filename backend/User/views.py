from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated

from User.serializers import InterestedCategorySerializer, UpdateInterestsSerializer


class InterestCategoryView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InterestedCategorySerializer

    def get_queryset(self):
        return self.request.user.interested_categories.all()


class UpdateInterestCategoryView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateInterestsSerializer

    def get_object(self):
        return self.request.user
